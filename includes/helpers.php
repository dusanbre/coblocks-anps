<?php

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}


add_action('rest_api_init', 'anps_wp_rest_insert_api_parms');
/**
 * anps_wp_rest_insert_api_parms
 *
 * @return void
 */
function anps_wp_rest_insert_api_parms()
{

    register_rest_field(
        'post',
        'post_categories',
        array(
            'get_callback'    => 'anps_wp_rest_get_categories_links',
            'update_callback' => null,
            'schema'          => null,
        )
    );
    register_rest_field(
        'post',
        'post_tags',
        array(
            'get_callback'    => 'anps_wp_rest_get_tags_links',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}

/**
 * anps_wp_rest_get_categories_links
 *
 * @param  mixed $post
 * @return void
 */
function anps_wp_rest_get_categories_links($post)
{
    $post_categories = array();
    $categories = wp_get_post_terms($post['id'], 'category', array('fields' => 'all'));
    foreach ($categories as $term) {
        $term_link = get_term_link($term);
        if (is_wp_error($term_link)) {
            continue;
        }
        $post_categories[] = array('term_id' => $term->term_id, 'name' => $term->name, 'link' => $term_link);
    }
    return $post_categories;
}
/**
 * anps_wp_rest_get_tags_links
 *
 * @param  mixed $post
 * @return void
 */
function anps_wp_rest_get_tags_links($post)
{
    $post_tags = array();
    $tags = wp_get_post_terms($post['id'], 'post_tag', array('fields' => 'all'));
    foreach ($tags as $term) {
        $term_link = get_term_link($term);
        if (is_wp_error($term_link)) {
            continue;
        }
        $post_tags[] = array('term_id' => $term->term_id, 'name' => $term->name, 'link' => $term_link);
    }
    return $post_tags;
}

//filter register post type for custom post type to add to rest api
add_filter('register_post_type_args', 'sb_add_cpts_to_api', 10, 2);
/**
 * sb_add_cpts_to_api
 *
 * @param  mixed $args
 * @param  mixed $post_type
 * @return void
 */
function sb_add_cpts_to_api($args, $post_type)
{
    if ('portfolio' === $post_type) {
        $args['show_in_rest'] = true;
        $args['query_var'] = true;
    }
    return $args;
}
