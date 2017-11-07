<?php
include 'ChromePhp.php';

$file_id='filer';
$status='';

ChromePhp::log("num_files recieved:" . count($_FILES));


//$date = date('Y_m_d_H:i:s');
//$date = date('Y_m_d_H:i');
//dont need seconds, a reupload in under a minute of the same file must be a mistake by user.

//$filename="../upload_data/" . $date . "_" . $_FILES[$file_id]['name'];
$filename="../upload_data/" . $_FILES[$file_id]['name'];

$tmpfile=$_FILES[$file_id]['tmp_name'];

ChromePhp::log($filename);


if(!$_FILES[$file_id]['name']) {
//    	echo "<script>alert('no file specified')</script>";
    	return;
  }
  /*copy file over to tmp directory */
if(move_uploaded_file($tmpfile, $filename)){
    ChromePhp::log('Success');
	json_encode($filename);
}else{
    ChromePhp::log('Failed');
}

?>

