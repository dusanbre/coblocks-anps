<?php

function anps_render_recent_portfolio($attributes)
{

    $category = (isset($attributes['selectedCategory'])) ? $attributes['selectedCategory'] : 0;
    $bg_color = (isset($attributes['bgColor'])) ? $attributes['bgColor'] : '';
    $item_bg_color = (isset($attributes['itemBgColor'])) ? $attributes['itemBgColor'] : '';
    $item_text_color = (isset($attributes['itemTextColor'])) ? $attributes['itemTextColor'] : '';
    $item_title_color = (isset($attributes['itemTitleColor'])) ? $attributes['itemTitleColor'] : '';
    $order = 'DESC';
    $orderby = 'date';
    $number = (isset($attributes['perPage'])) ? $attributes['perPage'] : '';
    $number_in_row = (isset($attributes['inRow'])) ? $attributes['inRow'] : 'col-md-4';
    $recent_title = (isset($attributes['title'])) ? $attributes['title'] : '';
    $title_color = (isset($attributes['titleColor'])) ? $attributes['titleColor'] : '';
    $hide_filter = (isset($attributes['filter'])) ? $attributes['filter'] : '';




    $tax_query = '';
    $attr = '';
    $hover_style = '';
    $hover_text_style = '';
    $hover_title_style = '';

    if ($category && $category != '0') {
        $tax_query = array(
            array(
                'taxonomy' => 'portfolio_category',
                'field' => 'id',
                'terms' => (int)$category
            )
        );
    }

    if ($bg_color != '') {
        $attr = ' data-bg="' . $bg_color . '"';
    }

    if ($item_bg_color != '') {
        $hover_style = ' style="background-color: ' . $item_bg_color . ';"';
    }

    if ($item_text_color != '') {
        $hover_text_style = ' style="color: ' . $item_text_color . ';"';
    }

    if ($item_title_color != '') {
        $hover_title_style = ' style="color: ' . $item_title_color . ';"';
    }

    $args = array(
        'post_type' => 'portfolio',
        'orderby' => $orderby,
        'order' => $order,
        'showposts' => $number,
        'tax_query' => $tax_query
    );
    $portfolio_posts = new WP_Query($args);



    $portfolio_data = '';
    $portfolio_data .= '<div class="projects projects-recent"' . $attr . '>';
    /* Header */
    $portfolio_data .= '<div class="projects-header clearfix">';

    /* Title */
    if ($recent_title) {
        $title_style = '';

        if ($title_color != '') {
            $title_style .= ' style="color: ' . $title_color . ';"';
        }

        $portfolio_data .= "<h2 class='title projects-title visible-lg pull-left'$title_style>$recent_title</h2>";
    }

    /* Filter */
    $filter_class = 'filter filter-dark pull-right';
    if ($hide_filter == 'true') {
        $filter_class .= ' filter-hidden';
    }
    $portfolio_data .= '<ul class="' . $filter_class . '">';
    $portfolio_data .= '<li><button data-filter="*" class="selected">' . esc_html__('All projects', 'anps_theme_plugin') . '</button></li>';
    $filters = get_terms('portfolio_category', "orderby=none&hide_empty=true");
    foreach ($filters as $item) {
        $data_filter = $item->slug;
        if (strpos($data_filter, '%') > -1) {
            $data_filter = 'cat-' . $item->term_id;
        }
        $portfolio_data .= '<li><button data-filter="' . $data_filter . '">' . $item->name . '</button></li>';
    }
    $portfolio_data .= '</ul>';

    $portfolio_data .= '</div>';
    /* END Header */
    /* Content */
    $portfolio_data .= '<div class="row projects-content">';
    while ($portfolio_posts->have_posts()) :
        $portfolio_posts->the_post();
        $portfolio_cat = "";
        if (get_the_terms(get_the_ID(), 'portfolio_category')) {
            $first_item = false;
            foreach (get_the_terms(get_the_ID(), 'portfolio_category') as $cat) {
                if ($first_item) {
                    $portfolio_cat .= " ";
                }
                $first_item = true;

                $new_cat = $cat->slug;
                if (strpos($new_cat, '%') > -1) {
                    $new_cat = 'cat-' . $cat->term_id;
                }

                $portfolio_cat .= $new_cat;
            }
        }
        if (has_post_thumbnail(get_the_ID())) {
            $image = get_the_post_thumbnail(get_the_ID(), 'anps-portfolio');
        } elseif (get_post_meta(get_the_ID(), $key = 'gallery_images', $single = true)) {
            $exploded_images = explode(',', get_post_meta(get_the_ID(), $key = 'gallery_images', $single = true));
            $image_url = wp_get_attachment_image_src($exploded_images[0], 'anps-portfolio');
            $image = "<img src='" . $image_url[0] . "' />";
        }
        $portfolio_data .= "<div class='projects-item col-xs-6 $number_in_row $portfolio_cat'>";
        $portfolio_data .= '<div class="projects-item-wrap">';
        $portfolio_data .= $image;
        $portfolio_data .= '<div class="project-hover-bg"' . $hover_style . '></div>';
        $portfolio_data .= '<div class="project-hover">';
        $portfolio_data .= "<h3 class='project-title text-uppercase'" . $hover_title_style . ">" . get_the_title() . "</h3>";
        $portfolio_data .= "<p" . $hover_text_style . ">" . get_the_excerpt() . "</p>";
        $portfolio_data .= "<a class='btn btn-md' href='" . get_permalink() . "'>" . esc_html__('Read More', 'anps_theme_plugin') . "</a>";
        $portfolio_data .= '</div>';
        $portfolio_data .= '</div>';
        $portfolio_data .= '</div>';
    endwhile;
    wp_reset_postdata();
    $portfolio_data .= '</div>';
    /* END Content */
    /* Buttons left/right */
    $pagination_style = '';

    if ($title_color != '') {
        $pagination_style .= ' style="color: ' . $title_color . ';"';
    }

    $portfolio_data .= '<div class="projects-pagination"' . $pagination_style . '>';
    $portfolio_data .= '<button class="prev"><i class="fa fa-angle-left"></i></button>';
    $portfolio_data .= '<button class="next"><i class="fa fa-angle-right"></i></button>';
    $portfolio_data .= '</div>';
    /* END Buttons left/right */
    $portfolio_data .= '</div>';
    return $portfolio_data;
}
