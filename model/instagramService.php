<?php
    include("secret.php");

    if (isset($_POST["action"]))
    {
        if ($_POST["action"] == "search")
        {
            $query = $_POST["query"];
            $url = "https://api.instagram.com/v1/users/search?q=" . $query ."&access_token=" . $accessToken;
            $resp = file_get_contents($url);
            echo $resp;
        }
        else if ($_POST["action"] == "getUserInformation")
        {
            $userId = $_POST["userId"];
            $url = "https://api.instagram.com/v1/users/" . $userId . "?access_token=" . $accessToken;
            $resp = file_get_contents($url);
            echo $resp;
        }
        else if ($_POST["action"] == "getMediaByTag")
        {
            $tag = $_POST["tag"];
            $url = "https://api.instagram.com/v1/tags/" . $tag . "/media/recent?access_token=" . $accessToken;
            $resp = file_get_contents($url);
            echo $resp;
        }
        else if ($_POST["action"] == "getMediaByTagWithMaxId")
        {
            $tag = $_POST["tag"];
            $maxId = $_POST["maxId"];
            $url = "https://api.instagram.com/v1/tags/" . $tag . "/media/recent?access_token=" . $accessToken . "&max_tag_id=" . $maxId;
            $resp = file_get_contents($url);
            echo $resp;
        }
    }
    else if (isset($_POST["maxId"]))
    {
        $userId = $_POST["userId"];
        $maxId = $_POST["maxId"];
        $url = "https://api.instagram.com/v1/users/" . $userId ."/media/recent?access_token=" . $accessToken . "&max_id=" . $maxId;
        $resp = file_get_contents($url);
        echo $resp;
    } else {
        $userId = $_POST["userId"];
        $url = "https://api.instagram.com/v1/users/" . $userId ."/media/recent?access_token=" . $accessToken;
        $resp = file_get_contents($url);
        echo $resp;
    }
?>