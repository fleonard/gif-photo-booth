<?php
    $img = $_POST['data'];
    $img = str_replace('data:image/gif;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    file_put_contents('/gifs/image.gif', $data);
?>
