<?php


if (!defined('ABSPATH')) {
    exit;
}


/**
 * AnpsBlocks_Register_Category
 */
class AnpsBlocks_Register_Category
{


    private static $instance;


    /**
     * register
     *
     * @return void
     */
    public static function register()
    {
        if (null === self::$instance) {
            self::$instance = new AnpsBlocks_Register_Category();
        }

        return self::$instance;
    }


    /**
     * slug
     *
     * @var mixed
     */
    private $slug;

    /**
     * __construct
     *
     * @return void
     */
    public function __construct()
    {
        $this->slug = 'anpsblocks';

        add_action('block_categories', array($this, 'anps_register_category'), 10, 2);
    }

    /**
     * anps_register_category
     *
     * @param  mixed $categories
     * @return void
     */
    function anps_register_category($categories)
    {
        return array_merge(
            $categories,
            array(
                array(
                    'slug' => $this->slug,
                    'title' => __('Anps Blocks', 'anpsblocks'),
                ),
            )
        );
    }
}

AnpsBlocks_Register_Category::register();
