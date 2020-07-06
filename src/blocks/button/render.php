<?php


function anps_cb_guten_button($attributes)
{


    $content = $attributes['text'];
    $link = $attributes['link'];
    $target = $attributes['target'];
    $color = $attributes['color'];
    $style_button = $attributes['style'];
    $background = $attributes['background'];
    $icon = $attributes['icon'];
    $size = $attributes['size'];
    $color_hover = $attributes['hoverColor'];
    $background_hover = $attributes['hoverBackground'];

    $anps_button_counter = 0;
    global $anps_button_counter;

    $style_attr = "";
    if ($color && $color != "#fff") {
        $style_attr .= "color: $color;";
    }
    if ($background && $style_button != 'btn-minimal') {
        $style_attr .= "background-color: $background";
    }

    switch ($size) {
        case 'large':
            $size = ' btn-lg';
            break;
        case 'medium':
            $size = ' btn-md';
            break;
        case 'small':
            $size = ' btn-sm';
            break;
    }

    $icon_class = "";
    if ($icon) {
        $icon_class = "<i class='$icon'></i> ";
    }

    //custom id
    $style_id = "button-id-" . $anps_button_counter;
    $anps_button_counter++;

    $style_css = '';
    if (!$link) {
        $style_css .= "<button id='$style_id'   class='btn $style_button $size' style='$style_attr'>$icon_class$content</button>";
    } else {
        $style_css .= "<a id='$style_id' target='$target' href='$link' class='btn $style_button $size' style='$style_attr'>$icon_class$content</a>";
    }
    /* Hover background and hover color */
    if ($color_hover || $background_hover) {
        $style_css .= '<style>';
        $style_css .= "#$style_id:hover{";
        if ($color_hover) {
            $style_css .= "color: $color_hover !important;";
        }
        if ($background_hover && $style_button != 'btn-minimal') {
            $style_css .= "background-color: $background_hover !important;";
        }
        $style_css .= '}';
        $style_css .= '</style>';
    }
    return $style_css;
}
