<?php
    header("content-type:text/html;charset=utf-8");
    $code = $_GET['code'];
    $type = $_GET['type'];
    $conn = mysqli_connect("localhost",'root','song0912','admin');
    if(!$conn){
        die("连接数据库失败".mysqli_connect_error());
    }
    if($type == 'load'){
        $sql = "select * from goodslist";
    }else if($type == 'select'){
        $sql = "select * from goodslist where code = '$code'";
    }else{
        die('{
            "status" : -1,
            "msg" : "传入参数有误"
        }');
    }
    $res = mysqli_query($conn,$sql);
    if(!$res){
        die("查询失败".mysqli_error($conn));
    }
    $arr = mysqli_fetch_all($res,1);
    mysqli_close($conn);
    $json = json_encode($arr);
    echo $json;
?>