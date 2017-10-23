<?php
    $img = $_POST['data'];
    $img = str_replace('data:image/gif;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    $filename = '/gifs/gif'.date('m-d-Y_hia').'gif';
    file_put_contents($filename, $data);
?>
