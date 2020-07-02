<?php
    header("content-type:text/html;charset=utf-8");
    $type = $_GET['type'];
    $code = $_GET['code'];
    $detail = $_GET['detail'];
    $norms = $_GET['norms'];
    $price = $_GET['price'];
    $imgSrc = $_GET['imgSrc'];
    $preferential = $_GET['preferential'];
    $num = $_GET['num'];
    $conn = mysqli_connect("localhost",'root','song0912','admin');
    if(!$conn){
        die("连接数据库失败".mysqli_connect_error());
    }
    if($type == 'add'){
        $add_sql = "insert into cartlist (code,detail,norms,price,imgSrc,preferential,num) value ('$code','$detail','$norms','$price','$imgSrc','$preferential','$num')";
        $result = mysqli_query($conn,$add_sql);
        mysqli_close($conn);
        if($result){
            echo '{
                "status" : 200,
                "msg" : "加入购物车成功"
            }';
        }else{
            echo '{
                "status" : -4,
                "msg" : "购物车中已有此商品"
            }';
        }     
    }else if($type == 'select'){
        $select_sql = "select * from cartlist";
        $res = mysqli_query($conn,$select_sql);
        if(!$res){
            die("查询失败".mysqli_error($conn));
        }
        $arr = mysqli_fetch_all($res,1);
        mysqli_close($conn);
        $json = json_encode($arr);
        echo $json;
    }else if($type == 'change'){
        $change_sql = "update cartlist set num = '$num' where code = '$code'";
        $change_res = mysqli_query($conn,$change_sql);
        mysqli_close($conn);
        if($change_res){
            echo '{
                "status" : 200,
                "msg" : "改变数据成功"
            }';
        }else{
            echo '{
                "status" : -4,
                "msg" : "改变数据失败"
            }';
        }
    }else if($type == 'del'){
        $del_sql = "delete from cartlist where code = '$code'";
        $del_res = mysqli_query($conn,$del_sql);
        mysqli_close($conn);
        if($del_res){
            echo '{
                "status" : 200,
                "msg" : "删除商品成功"
            }';
        }else{
            echo '{
                "status" : -4,
                "msg" : "删除商品失败"
            }';
        }
    }else{
        die('{
            "status" : -1,
            "msg" : "传入参数有误"
        }');
    }
    
?>