<?php
@ob_start();

$content = file_get_contents("inc/content.json");
$contentData = json_decode($content, true);

@include("inc/_header.php");

$_OPTIMIZATION = array();
$_OPTIMIZATION["title"] = $contentData["SiteTitle"].$contentData["IndexTitle"];
$_OPTIMIZATION["description"] = $contentData["IndexDescription"];
$_OPTIMIZATION["keywords"] = $contentData["IndexKeywords"];

if (isset($_GET["menu"])) {
	
  $menu = strval($_GET["menu"]);
  switch ($menu) {
	  
    case "404":
      include("pages/_404.php");
      break;
	  
    case "play":
      include("pages/_play.php");
      break;
	  
    case "avatars":
      include("pages/_avatars.php");
      break;
	  
    case "island":
      include("pages/_island.php");
      break;
	  
    case "staking":
      include("pages/_staking.php");
      break;
	  
    case "swap":
      include("pages/_swap.php");
      break;
	  
    case "referral":
      include("pages/_referral.php");
      break;    
	  
	case "token":
      include("pages/_token.php");
      break;
	  
	case "app":
      include("pages/_app.php");
      break;
	  
    default:
      @include("pages/_404.php");
      break;
	  
  }
  
} else {
  @include("pages/_staking.php");
}

@include("inc/_footer.php");

$content = ob_get_contents();

ob_end_clean();
	
	$content = str_replace("{!TITLE!}", $_OPTIMIZATION["title"], $content);
	$content = str_replace('{!DESCRIPTION!}', $_OPTIMIZATION["description"], $content);
	$content = str_replace('{!KEYWORDS!}' ,$_OPTIMIZATION["keywords"], $content);

echo $content;
?>
