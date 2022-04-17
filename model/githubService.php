<?php
    include("secret.php");
    $auth = base64_encode("ToWelie89:".$accessToken);

	$opts = [
        'http' => [
            'method' => 'GET',
            'header' => [
                'User-Agent: PHP',
                "Authorization: Basic $auth"
            ]
        ]
    ];

    $context = stream_context_create($opts);

    if (isset($_POST["url"]))
    {
        $url = $_POST["url"];

        if (strpos($url, '?') !== false) {
            $url = $url . "&client_id=" . $github_client_id . "&client_secret=" . $github_client_secret;
        } else {
            $url = $url . "?client_id=" . $github_client_id . "&client_secret=" . $github_client_secret;
        }

        $resp = file_get_contents($url, false, $context);
        echo $resp;
    }
?>
