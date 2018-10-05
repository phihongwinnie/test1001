<?php 

	$dsn="mysql:host=localhost;port=3306;dbname=china_area;charset=utf8";
	$user="winnie";
	$userpassword="82018201";
	$options=array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
	$pdo = new PDO($dsn,$user,$userpassword,$options);

?>

<?php
	try{
		$sql = "SELECT * FROM china_citycode WHERE province_code ='". $_POST["proNo"]."'";
		$cityData = $pdo->query($sql);
		if ($cityData > 0){
			echo "<option value=''>请选择市</option>";
			while ($cityDataRow = $cityData->fetchObject()){
				echo "<option value ='".$cityDataRow->city_code."'>".$cityDataRow->city_name."</option>";
			}
		}

	}catch (PDOException $e){
		echo "錯誤原因: ", $e->getMessage(), "<br>";
	    echo "錯誤行號: ", $e->getLine(), "<br>";
	}

?>
