<?php
    include("secret.php");

    if (isset($_POST["url"]))
    {
        $url = $_POST["url"];

        if (strpos($url, '?') !== false) {
            $url = $url . "&client_id=" . $github_client_id . "&client_secret=" . $github_client_secret;
        } else {
            $url = $url . "?client_id=" . $github_client_id . "&client_secret=" . $github_client_secret;
        }

        $resp = file_get_contents($url);
        $encodedResp = json_encode($resp);
        echo $encodedResp;
    }
?>