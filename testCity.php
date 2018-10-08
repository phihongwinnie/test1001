<?php 

    $dsn="mysql:host=localhost;port=3306;dbname=china_area;charset=utf8";
    $user="winnie";
    $userpassword="82018201";
    $options=array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
    $pdo = new PDO($dsn,$user,$userpassword,$options);

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="jquery-3.2.1.min.js"></script>

    <title>test</title>
</head>

<body>
    <select name="" id="myProvince">
        <option value="">请选择省</option>
        <?php
            try{
                $sql = "SELECT * FROM china_provincecode";
                $proData = $pdo->query($sql);
                while ($proDataRow = $proData->fetchObject()){
        ?>
            <option value="<?php echo $proDataRow->province_code?>"><?php echo $proDataRow->province_name?></option>
        <?php
        }      
            }catch (PDOException $e){
                echo "錯誤原因: ", $e->getMessage(), "<br>";
                echo "錯誤行號: ", $e->getLine(), "<br>";
            }
        ?>
    </select>
    <select name="" id="myCity">
        <option value="">请选择市</option>
    </select>
    <select name="" id="myArea">
        <option value="">请选择区县</option>
    </select>

    <script>
        $(document).ready(function() {
            $('#myProvince').change(function() {
                fillCity();
                fillArea();
            });
            
            $('#myCity').change(function(){
                fillArea();
            });
        });

        function fillCity(){
            $.ajax({
                url: 'proNo_ajax.php',
                type: 'POST',
                data:{
                    proNo: $('#myProvince').val()
                },
                error: function(xhr) {
                    alert('Ajax request 發生錯誤');
                },
                success: function(data){
                    $('#myCity').html(data);
                }
            })
        }
        function fillArea(){
            $.ajax({
                url: 'cityNo_ajax.php',
                type: 'POST',
                data:{
                    cityNo: $('#myCity').val()
                },
                error: function(xhr) {
                    alert('Ajax request 發生錯誤');
                },
                success: function(data){
                    $('#myArea').html(data);
                }
            })
        }



    </script>
</body>

</html>