<?php
    header("content-type:text/html;charset=utf-8");
    $type = $_GET['type'];
    $user = $_GET['user'];
    $pass = $_GET['pass'];
    if($type && $user && $pass){
        $conn = mysqli_connect("localhost",'root','song0912','admin');
        if(!$conn){
            die("连接失败".mysqli_connect_error());
        }
        if($type == 'login'){
            $select_sql = "select * from user where username = '$user' and password = '$pass'";
            $select_res = mysqli_query($conn,$select_sql);
            $select_arr = mysqli_fetch_all($select_res,1);
            if(count($select_arr) > 0){
                echo '{
                    "status" : 200,
                    "msg" : "登录成功"
                }';
            }else{
                echo '{
                    "status" : -3,
                    "msg" : "用户名或密码错误"
                }';
            }
        }else if($type == 'add'){
            $select_sql = "select * from user where username = '$user'";
            $select_res = mysqli_query($conn,$select_sql);
            $select_arr = mysqli_fetch_all($select_res,1);
            if(count($select_arr) > 0){
                die('{
                    "status" : -2,
                    "msg" : "用户名已被占用"
                }');
            }
            $add_sql = "insert into user (username,password) value ('$user','$pass')";
            $add_res = mysqli_query($conn,$add_sql);
            if($add_res){
                echo '{
                    "status" : 200,
                    "msg" : "注册成功"
                }';
            }else{
                echo '{
                    "status" : -4,
                    "msg" : "注册失败"
                }';
            }
        }else{
            die('{
                "status" : -1,
                "msg" : "传入参数有误"
            }');
        }
        mysqli_close($conn);
    }else{
        echo '{
            "status" : -1,
            "msg" : "传入参数有误"
        }';
    }
?>