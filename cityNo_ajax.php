<?php

	$dsn="mysql:host=localhost;port=3306;dbname=china_area;charset=utf8";
	$user="winnie";
	$userpassword="82018201";
	$options=array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
	$pdo = new PDO($dsn,$user,$userpassword,$options);

?>

<?php
	try{
		$sql = "SELECT * FROM china_areacode WHERE city_code ='". $_POST["cityNo"]."'";
		$areaData = $pdo->query($sql);
		if ($areaData > 0){
			echo "<option value=''>请选择区县</option>";
			while ($areaDataRow = $areaData->fetchObject()){
				echo "<option value ='".$areaDataRow->area_code."'>".$areaDataRow->area_name."</option>";
			}
		}

	}catch (PDOException $e){
		echo "錯誤原因: ", $e->getMessage(), "<br>";
	    echo "錯誤行號: ", $e->getLine(), "<br>";
	}

?>