<?php
$width = get_field('width');

$columnClass = "";

switch ($width) {
  case '1/2':
    $columnClass = "w-1/2";
    break;
  case '1/3':
    $columnClass = "w-1/3";
    break;
  case '2/3':
    $columnClass = "w-2/3";
    break;
  case '1/4':
    $columnClass = "w-1/4";
    break;
  case '3/4':
    $columnClass = "w-3/4";
    break;
  case '1/5':
    $columnClass = "w-1/5";
    break;
  case '2/5':
    $columnClass = "w-2/5";
    break;
  case '3/5':
    $columnClass = "w-3/5";
    break;
  case '4/5':
    $columnClass = "w-4/5";
    break;
  case '1/6':
    $columnClass = "w-1/6";
    break;
  case '5/6':
    $columnClass = "w-5/6";
    break;
  case '1/12':
    $columnClass = "w-1/12";
    break;
  case '5/12':
    $columnClass = "w-5/12";
    break;
  case '7/12':
    $columnClass = "w-7/12";
    break;
  case '11/12':
    $columnClass = "w-11/12";
    break;
  default:
    $columnClass = "w-full";
    break;
}
?>


<div class="mb-4 <?php echo $columnClass; ?>">
  <InnerBlocks />
</div>