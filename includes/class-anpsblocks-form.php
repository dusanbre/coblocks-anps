<?php

/**
 * Render form block fields
 *
 * @package   @@pkg.title
 * @author    @@pkg.author
 * @link      @@pkg.author_uri
 * @license   @@pkg.license
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Main @@pkg.title Class
 *
 * @since 2.0.0
 */
class AnpsBlocks_Form
{

	/**
	 * Email content
	 *
	 * @var string
	 */
	private $email_content;

	/**
	 * Form hash
	 *
	 * @var string
	 */
	private $form_hash;

	/**
	 * Google Recaptcha v3 verify endpoint
	 *
	 * @var string
	 */
	const GCAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

	/**
	 * Default email subject line
	 *
	 * @var string
	 */
	public function default_subject()
	{
		// translators: placeholder for email shortcode.
		return sprintf(__('Form submission from [%1$s]', 'anpsblocks'), 'email');
	}

	/**
	 * The Constructor.
	 */
	public function __construct()
	{

		add_action('init', array($this, 'register_settings'));
		add_action('init', array($this, 'register_form_blocks'));

		add_action('wp_enqueue_scripts', array($this, 'form_recaptcha_assets'));
	}

	/**
	 * Register block settings.
	 *
	 * @access public
	 */
	public function register_settings()
	{
		register_setting(
			'anpsblocks_google_recaptcha_site_key',
			'anpsblocks_google_recaptcha_site_key',
			array(
				'type'              => 'string',
				'description'       => __('Google reCaptcha site key for form spam protection', 'anpsblocks'),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => '',
			)
		);

		register_setting(
			'anpsblocks_google_recaptcha_secret_key',
			'anpsblocks_google_recaptcha_secret_key',
			array(
				'type'              => 'string',
				'description'       => __('Google reCaptcha secret key for form spam protection', 'anpsblocks'),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => '',
			)
		);
	}

	/**
	 * Enqueue form block assets when recaptcha site & secret keys are present
	 */
	public function form_recaptcha_assets()
	{

		$recaptcha_site_key   = get_option('anpsblocks_google_recaptcha_site_key');
		$recaptcha_secret_key = get_option('anpsblocks_google_recaptcha_secret_key');

		if (has_block('anpsblocks/form') && !empty($recaptcha_site_key) && !empty($recaptcha_secret_key)) {

			wp_enqueue_script(
				'google-recaptcha',
				'https://www.google.com/recaptcha/api.js?render=' . esc_attr($recaptcha_site_key),
				array('jquery'),
				'3.0.0',
				true
			);

			wp_enqueue_script(
				'anpsblocks-google-recaptcha',
				AnpsBlocks()->asset_source('js') . 'anpsblocks-google-recaptcha.js',
				array('jquery', 'google-recaptcha'),
				ANPSBLOCKS_VERSION,
				true
			);

			wp_localize_script(
				'anpsblocks-google-recaptcha',
				'anpsblocksFormBlockAtts',
				array(
					'recaptchaSiteKey' => $recaptcha_site_key,
				)
			);
		}
	}

	/**
	 * Register the form blocks.
	 */
	public function register_form_blocks()
	{

		register_block_type(
			'anpsblocks/form',
			array(
				'render_callback' => array($this, 'render_form'),
			)
		);

		$form_blocks = array(
			'name',
			'email',
			'textarea',
			'text',
			'date',
			'phone',
			'radio',
			'select',
			'submit-button',
			'checkbox',
			'website',
			'hidden',
		);

		foreach ($form_blocks as $form_block) {

			register_block_type(
				"anpsblocks/field-${form_block}",
				array(
					'parent'          => array('anpsblocks/form'),
					'render_callback' => array($this, sprintf('render_field_%s', str_replace('-', '_', $form_block))),
				)
			);
		}

		/**
		 * Fires when the anpsblocks/form block and sub-blocks are registered
		 */
		do_action('anpsblocks_register_form_blocks');
	}

	/**
	 * Render the form
	 *
	 * @param array $atts    Block attributes.
	 * @param mixed $content Block content.
	 *
	 * @return mixed Form markup or success message when form submits successfully.
	 */
	public function render_form($atts, $content)
	{

		$this->form_hash = sha1($content);
		$submitted_hash  = filter_input(INPUT_POST, 'form-hash', FILTER_SANITIZE_STRING);

		ob_start();
?>

		<div class="anpsblocks-form" id="<?php echo esc_attr($this->form_hash); ?>">

			<?php
			if ($submitted_hash === $this->form_hash) {

				$submit_form = $this->process_form_submission($atts);

				if ($submit_form) {

					$this->success_message();

					print('</div>');

					return ob_get_clean();
				}
			}
			?>

			<form action="<?php echo esc_url(sprintf('%1$s#%2$s', set_url_scheme(get_the_permalink()), $this->form_hash)); ?>" method="post">
				<?php echo do_blocks($content); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
				?>
				<input class="anpsblocks-field verify" type="email" name="anpsblocks-verify-email" autocomplete="off" placeholder="<?php esc_attr_e('Email', 'anpsblocks'); ?>" tabindex="-1">
				<input type="hidden" name="form-hash" value="<?php echo esc_attr($this->form_hash); ?>">

				<?php
				// Output a submit button if it's not found in the block content.
				if (false === strpos($content, 'anpsblocks-form__submit')) :
					echo $this->render_field_submit_button($atts); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				endif;
				?>
			</form>

		</div>

	<?php

		return ob_get_clean();
	}

	/**
	 * Render the name field
	 *
	 * @param array $atts Block attributes.
	 *
	 * @return mixed Markup for the name field.
	 */
	public function render_field_name($atts)
	{

		static $name_count = 1;

		$label            = isset($atts['label']) ? $atts['label'] : __('Name', 'anpsblocks');
		$label_slug       = $name_count > 1 ? sanitize_title($label . '-' . $name_count) : sanitize_title($label);
		$required_attr    = (isset($atts['required']) && $atts['required']) ? 'required' : '';
		$has_last_name    = (isset($atts['hasLastName']) && $atts['hasLastName']);
		$label_first_name = isset($atts['labelFirstName']) ? $atts['labelFirstName'] : __('First', 'anpsblocks');
		$label_last_name  = isset($atts['labelLastName']) ? $atts['labelLastName'] : __('Last', 'anpsblocks');

		ob_start();

		$this->render_field_label($atts, $label, $name_count);

	?>
		<input type="hidden" id="name-field-id" name="name-field-id" class="anpsblocks-name-field-id" value="field-<?php echo esc_attr($label_slug); ?>" />
		<?php

		if ($has_last_name) {

		?>

			<div class="anpsblocks-form__inline-fields">
				<div class="anpsblocks-form__inline-field">
					<input type="text" id="<?php echo esc_attr($label_slug); ?>-firstname" name="field-<?php echo esc_attr($label_slug); ?>[value][first-name]" class="anpsblocks-field anpsblocks-field--name first" <?php echo esc_attr($required_attr); ?> />
					<small class="anpsblocks-form__subtext"><?php echo esc_html($label_first_name); ?></small>
				</div>

				<div class="anpsblocks-form__inline-field">
					<input type="text" id="<?php echo esc_attr($label_slug); ?>-lastname" name="field-<?php echo esc_attr($label_slug); ?>[value][last-name]" class="anpsblocks-field anpsblocks-field--name last" <?php echo esc_attr($required_attr); ?> />
					<small class="anpsblocks-form__subtext"><?php echo esc_html($label_last_name); ?></small>
				</div>
			</div>

		<?php

			$name_count++;

			return ob_get_clean();
		}

		?>

		<input type="text" id="<?php echo esc_attr($label_slug); ?>" name="field-<?php echo esc_attr($label_slug); ?>[value]" class="anpsblocks-field anpsblocks-field--name" <?php echo esc_attr($required_attr); ?> />

	<?php

		$name_count++;

		return ob_get_clean();
	}

	/**
	 * Render the email field
	 *
	 * @param array $atts Block attributes.
	 *
	 * @return mixed Markup for the email field.
	 */
	public function render_field_email($atts)
	{

		$label         = isset($atts['label']) ? $atts['label'] : __('Email', 'anpsblocks');
		$label_slug    = sanitize_title($label);
		$required_attr = (isset($atts['required']) && $atts['required']) ? 'required' : '';

		ob_start();

		$this->render_field_label($atts, $label);

	?>

		<input type="hidden" id="email-field-id" name="email-field-id" class="anpsblocks-email-field-id" value="field-<?php echo esc_attr($label_slug); ?>" />
		<input type="email" id="<?php echo esc_attr($label_slug); ?>" name="field-<?php echo esc_attr($label_slug); ?>[value]" class="anpsblocks-field anpsblocks-field--email" <?php echo esc_attr($required_attr); ?> />

	<?php

		return ob_get_clean();
	}

	/**
	 * Render the textarea field
	 *
	 * @param  array $atts    Block attributes.
	 *
	 * @return mixed Markup for the textarea field.
	 */
	public function render_field_textarea($atts)
	{

		static $textarea_count = 1;

		$label         = isset($atts['label']) ? $atts['label'] : __('Message', 'anpsblocks');
		$label_slug    = $textarea_count > 1 ? sanitize_title($label . '-' . $textarea_count) : sanitize_title($label);
		$required_attr = (isset($atts['required']) && $atts['required']) ? 'required' : '';

		ob_start();

		$this->render_field_label($atts, $label, $textarea_count);

	?>

		<textarea name="field-<?php echo esc_attr($label_slug); ?>[value]" id="<?php echo esc_attr($label_slug); ?>" class="anpsblocks-field anpsblocks-textarea" rows="20" <?php echo esc_attr($required_attr); ?>></textarea>

	<?php

		$textarea_count++;

		return ob_get_clean();
	}

	/**
	 * Render the text field
	 *
	 * @param  array $atts    Block attributes.
	 *
	 * @return mixed Markup for the text field.
	 */
	public function render_field_text($atts)
	{

		static $text_count = 1;

		$label         = isset($atts['label']) ? $atts['label'] : __('Text', 'anpsblocks');
		$label_slug    = $text_count > 1 ? sanitize_title($label . '-' . $text_count) : sanitize_title($label);
		$required_attr = (isset($atts['required']) && $atts['required']) ? 'required' : '';

		ob_start();

		$this->render_field_label($atts, $label, $text_count);

	?>

		<input type="text" name="field-<?php echo esc_attr($label_slug); ?>[value]" id="<?php echo esc_attr($label_slug); ?>" class="anpsblocks-field anpsblocks-text" <?php echo esc_attr($required_attr); ?>>

	<?php

		$text_count++;

		return ob_get_clean();
	}

	/**
	 * Render the date field
	 *
	 * @param  array $atts Block attributes.
	 *
	 * @return mixed Markup for the date field.
	 */
	public function render_field_date($atts)
	{

		static $date_count = 1;

		wp_enqueue_script(
			'anpsblocks-datepicker',
			AnpsBlocks()->asset_source('js') . 'anpsblocks-datepicker.js',
			array('jquery', 'jquery-ui-datepicker'),
			ANPSBLOCKS_VERSION,
			true
		);

		wp_localize_jquery_ui_datepicker();

		$label         = isset($atts['label']) ? $atts['label'] : __('Date', 'anpsblocks');
		$label_slug    = $date_count > 1 ? sanitize_title($label . '-' . $date_count) : sanitize_title($label);
		$required_attr = (isset($atts['required']) && $atts['required']) ? 'required' : '';

		ob_start();

		$this->render_field_label($atts, $label, $date_count);

	?>

		<input type="text" id="<?php echo esc_attr($label_slug); ?>" name="field-<?php echo esc_attr($label_slug); ?>[value]" class="anpsblocks-field anpsblocks-field--date" <?php echo esc_attr($required_attr); ?> />

	<?php

		$date_count++;

		return ob_get_clean();
	}

	/**
	 * Render the phone field
	 *
	 * @param  array $atts Block attributes.
	 *
	 * @return mixed Markup for the phone field.
	 */
	public function render_field_phone($atts)
	{

		static $phone_count = 1;

		$label         = isset($atts['label']) ? $atts['label'] : __('Phone', 'anpsblocks');
		$label_slug    = $phone_count > 1 ? sanitize_title($label . '-' . $phone_count) : sanitize_title($label);
		$required_attr = (isset($atts['required']) && $atts['required']) ? 'required' : '';

		ob_start();

		$this->render_field_label($atts, $label, $phone_count);

	?>

		<input type="tel" id="<?php echo esc_attr(sanitize_title($label)); ?>" name="field-<?php echo esc_attr($label_slug); ?>[value]" class="anpsblocks-field anpsblocks-field--telephone" <?php echo esc_attr($required_attr); ?> />

	<?php

		$phone_count++;

		return ob_get_clean();
	}

	/**
	 * Render the radio field
	 *
	 * @param  array $atts Block attributes.
	 *
	 * @return mixed Markup for the radio field.
	 */
	public function render_field_radio($atts)
	{

		if (empty($atts['options'])) {

			return;
		}

		static $radio_count = 1;

		$the_options = array_filter($atts['options']);

		$label      = isset($atts['label']) ? $atts['label'] : __('Choose one', 'anpsblocks');
		$label_desc = sanitize_title($label) !== 'choose-one' ? sanitize_title($label) : 'radio';
		$label_slug = $radio_count > 1 ? sanitize_title($label_desc . '-' . $radio_count) : sanitize_title($label_desc);

		ob_start();

		print('<div class="anpsblocks-field">');

		$this->render_field_label($atts, $label, $radio_count);

		if (isset($atts['isInline'])) {

			print('<div class="anpsblocks--inline">');
		}

		foreach ($the_options as $value) {

			printf(
				'<input id="%1$s" type="radio" name="field-%2$s[value]" value="%3$s" class="radio">
				<label class="anpsblocks-radio-label" for="%1$s">%4$s</label>',
				esc_attr($label_slug . '-' . sanitize_title($value)),
				esc_attr($label_slug),
				esc_attr($value),
				esc_html($value)
			);
		}

		if (isset($atts['isInline'])) {

			print('</div>');
		}

		print('</div>');

		$radio_count++;

		return ob_get_clean();
	}

	/**
	 * Render the select field
	 *
	 * @param  array $atts Block attributes.
	 *
	 * @return mixed Markup for the select field.
	 */
	public function render_field_select($atts)
	{

		if (empty($atts['options'])) {

			return;
		}

		static $select_count = 1;

		$the_options = array_filter($atts['options']);

		$label      = isset($atts['label']) ? $atts['label'] : __('Select', 'anpsblocks');
		$label_slug = $select_count > 1 ? sanitize_title($label . '-' . $select_count) : sanitize_title($label);

		ob_start();

		$this->render_field_label($atts, $label, $select_count);

		printf(
			'<select class="select anpsblocks-field" name="field-%1$s[value]">',
			esc_attr($label_slug)
		);

		foreach ($the_options as $value) {

			printf(
				'<option value="%1$s">%2$s</option>',
				esc_attr($value),
				esc_html($value)
			);
		}

		print('</select>');

		$select_count++;

		return ob_get_clean();
	}

	/**
	 * Render the checkbox field
	 *
	 * @param  array $atts Block attributes.
	 *
	 * @return mixed Markup for the checkbox field.
	 */
	public function render_field_checkbox($atts)
	{

		if (empty($atts['options'])) {

			return;
		}

		static $checkbox_count = 1;

		$the_options = array_filter($atts['options']);

		$label      = isset($atts['label']) ? $atts['label'] : __('Select', 'anpsblocks');
		$label_slug = $checkbox_count > 1 ? sanitize_title($label . '-' . $checkbox_count) : sanitize_title($label);

		ob_start();

		print('<div class="anpsblocks-field">');

		$this->render_field_label($atts, $label, $checkbox_count);

		if (isset($atts['isInline'])) {

			print('<div class="anpsblocks--inline">');
		}

		foreach ($the_options as $value) {

			printf(
				'<input id="%1$s" type="checkbox" name="field-%2$s[value][]" value="%3$s" class="checkbox">
				<label class="anpsblocks-checkbox-label" for="%1$s">%4$s</label>',
				esc_attr($label_slug . '-' . sanitize_title($value)),
				esc_attr($label_slug),
				esc_attr($value),
				esc_html($value)
			);
		}

		if (isset($atts['isInline'])) {

			print('</div>');
		}

		print('</div>');

		$checkbox_count++;

		return ob_get_clean();
	}

	/**
	 * Render the website field
	 *
	 * @param  array $atts Block attributes.
	 *
	 * @return mixed Markup for the website field.
	 */
	public function render_field_website($atts)
	{

		static $website_count = 1;

		$label         = isset($atts['label']) ? $atts['label'] : __('Website', 'anpsblocks');
		$label_slug    = $website_count > 1 ? sanitize_title($label . '-' . $website_count) : sanitize_title($label);
		$required_attr = (isset($atts['required']) && $atts['required']) ? 'required' : '';

		ob_start();

		$this->render_field_label($atts, $label, $website_count);

	?>

		<input type="url" id="<?php echo esc_attr(sanitize_title($label)); ?>" name="field-<?php echo esc_attr($label_slug); ?>[value]" class="anpsblocks-field anpsblocks-field--website" <?php echo esc_attr($required_attr); ?> />

	<?php

		$website_count++;

		return ob_get_clean();
	}

	/**
	 * Render the hidden field
	 *
	 * @param  array $atts Block attributes.
	 *
	 * @return mixed Markup for the hidden field.
	 */
	public function render_field_hidden($atts)
	{

		static $hidden_count = 1;

		$atts['hidden'] = true;

		$value      = isset($atts['value']) ? $atts['value'] : '';
		$label      = isset($atts['label']) ? $atts['label'] : __('Hidden', 'anpsblocks');
		$label_slug = $hidden_count > 1 ? sanitize_title($label . '-' . $hidden_count) : sanitize_title($label);

		ob_start();

		$this->render_field_label($atts, $label, $hidden_count);

	?>

		<input type="hidden" value="<?php echo esc_attr($value); ?>" id="<?php echo esc_attr(sanitize_title($label)); ?>" name="field-<?php echo esc_attr($label_slug); ?>[value]" class="anpsblocks-field anpsblocks-field--hidden" />

	<?php

		$hidden_count++;

		return ob_get_clean();
	}

	/**
	 * Generate the form field label.
	 *
	 * @param  array $atts        Block attributes.
	 * @param  mixed $field_label Block content.
	 * @param  int   $count       Number of times the field has been rendered in the form.
	 *
	 * @return mixed Form field label markup.
	 */
	public function render_field_label($atts, $field_label, $count = 1)
	{

		$label      = isset($atts['label']) ? $atts['label'] : $field_label;
		$label_slug = $count > 1 ? sanitize_title($label . '-' . $count) : sanitize_title($label);

		/**
		 * Filter the required text in the field label.
		 *
		 * @param string $field_label Form field label text.
		 */
		$required_text  = (string) apply_filters('anpsblocks_form_label_required_text', '&#42;', $field_label);
		$required_attr  = (isset($atts['required']) && $atts['required']) ? 'required' : '';
		$required_label = empty($required_attr) ? '' : sprintf(' <span class="required">%s</span>', esc_html($required_text));

		/*
		 * Format an array of allowed HTML tags and attributes for the $required_label value.
		 *
		 * @link https://codex.wordpress.org/Function_Reference/wp_kses
		 */
		$allowed_html = array(
			'span' => array('class' => array()),
		);

		if (!isset($atts['hidden'])) {

			printf(
				'<label for="%1$s" class="anpsblocks-label">%2$s%3$s</label>',
				esc_attr($label_slug),
				wp_kses_post($label),
				wp_kses($required_label, $allowed_html)
			);
		}

	?>

		<input type="hidden" name="field-<?php echo esc_attr($label_slug); ?>[label]" value="<?php echo esc_attr($label); ?>">

	<?php

	}

	/**
	 * Render the form submit button.
	 *
	 * @param  array $atts Block attributes.
	 *
	 * @return mixed Form submit button markup.
	 */
	public function render_field_submit_button($atts)
	{

		$btn_text             = isset($atts['submitButtonText']) ? $atts['submitButtonText'] : __('Submit', 'anpsblocks');
		$btn_class            = isset($atts['submitButtonClasses']) ? " {$atts['submitButtonClasses']}" : '';
		$styles               = array();
		$recaptcha_site_key   = get_option('anpsblocks_google_recaptcha_site_key');
		$recaptcha_secret_key = get_option('anpsblocks_google_recaptcha_secret_key');

		if (isset($atts['className'])) {

			$btn_class = str_replace(
				array(
					'is-style-fill',
					'is-style-outline',
					'is-style-circular',
					'is-style-3d',
					'is-style-shadow',
				),
				$atts['className'],
				$btn_class
			);
		}

		if (isset($atts['customBackgroundButtonColor'])) {
			$styles[] = "background-color: {$atts['customBackgroundButtonColor']};";
		}

		if (isset($atts['customTextButtonColor'])) {
			$styles[] = "color: {$atts['customTextButtonColor']};";
		}

		ob_start();
	?>

		<div class="anpsblocks-form__submit wp-block-button">
			<button type="submit" class="wp-block-button__link<?php echo esc_attr($btn_class); ?>" style="<?php echo esc_attr(implode(' ', $styles)); ?>"><?php echo esc_html($btn_text); ?></button>
			<?php wp_nonce_field('anpsblocks-form-submit', 'form-submit'); ?>
			<input type="hidden" name="action" value="anpsblocks-form-submit">

			<?php if ($recaptcha_site_key && $recaptcha_secret_key) : ?>
				<input type="hidden" class="g-recaptcha-token" name="g-recaptcha-token" />
			<?php endif; ?>
		</div>

	<?php
		return ob_get_clean();
	}

	/**
	 * Process the form submission
	 *
	 * @param  array $atts Block attributes.
	 *
	 * @return bool True when an email is sent, else false.
	 */
	public function process_form_submission($atts)
	{

		$form_submission = filter_input(INPUT_POST, 'action', FILTER_SANITIZE_STRING);

		if (!$form_submission || 'anpsblocks-form-submit' !== $form_submission) {

			return;
		}

		$nonce = filter_input(INPUT_POST, 'form-submit', FILTER_SANITIZE_STRING);

		if (!$nonce || !wp_verify_nonce($nonce, 'anpsblocks-form-submit')) {

			return;
		}

		/**
		 * Check if the honeypot field was filled out and if so, bail.
		 */
		$honeypot_check = filter_input(INPUT_POST, 'anpsblocks-verify-email', FILTER_SANITIZE_STRING);

		if (!empty($honeypot_check)) {

			$this->remove_url_form_hash();

			return;
		}

		/**
		 * Fires before a form is submitted.
		 *
		 * @param array $_POST User submitted form data.
		 * @param array $atts  Form block attributes.
		 */
		do_action('anpsblocks_before_form_submit', $_POST, $atts);

		/**
		 * Filter to disable the AnpsBlocks form emails.
		 *
		 * @param bool false Whether or not the emails should be disabled.
		 */
		$send_email = (bool) apply_filters('anpsblocks_form_email_send', true);

		if (!$send_email) {

			return true;
		}

		$post_id        = filter_input(INPUT_GET, 'post', FILTER_SANITIZE_NUMBER_INT);
		$post_title     = get_bloginfo('name') . ((false === $post_id) ? '' : sprintf(' - %s', get_the_title($post_id)));
		$email_field_id = isset($_POST['email-field-id']) ? esc_html($_POST['email-field-id']) : 'field-email';
		$name_field_id  = isset($_POST['name-field-id']) ? esc_html($_POST['name-field-id']) : 'field-name';

		$to = isset($atts['to']) ? sanitize_email($atts['to']) : get_option('admin_email');

		unset($_POST['form-submit'], $_POST['_wp_http_referer'], $_POST['action'], $_POST['form-hash'], $_POST['anpsblocks-verify-email'], $_POST['email-field-id'], $_POST['name-field-id']);

		if (isset($_POST['g-recaptcha-token'])) {

			if (!$this->verify_recaptcha($_POST['g-recaptcha-token'])) {

				$this->remove_url_form_hash();

				return false;
			}

			unset($_POST['g-recaptcha-token']);
		}

		$this->email_content = '<ul>';

		foreach ($_POST as $key => $data) {

			if (is_array($data['value'])) {

				$data['value'] = implode(', ', $data['value']);
			}

			$this->email_content .= '<li>' . wp_kses_post($data['label']) . ': ' . wp_kses_post($data['value']) . '</li>';
		}

		$this->email_content .= '</ul>';

		/**
		 * Filter the email to
		 *
		 * @param string  $to      Email to.
		 * @param array   $_POST   Submitted form data.
		 * @param integer $post_id Current post ID.
		 */
		$to = (string) apply_filters('anpsblocks_form_email_to', $to, $_POST, $post_id);

		/**
		 * Filter the email subject
		 *
		 * @param string $subject Email subject.
		 * @param array  $_POST   Submitted form data.
		 */
		$subject = (string) apply_filters('anpsblocks_form_email_subject', $this->setup_email_subject($atts, $email_field_id, $name_field_id), $_POST);

		/**
		 * Filter the form email content.
		 *
		 * @param string  $this->email_content Email content.
		 * @param array   $_POST               Submitted form data.
		 * @param integer $post_id             Current post ID.
		 */
		$email_content = (string) apply_filters('anpsblocks_form_email_content', $this->email_content, $_POST, $post_id);

		$reply_to = isset($_POST[$email_field_id]['value']) ? esc_html($_POST[$email_field_id]['value']) : esc_html(get_bloginfo('admin_email'));

		/**
		 * Filter the form email headers.
		 *
		 * @param array   []       Email headers.
		 * @param array   $_POST   Submitted form data.
		 * @param integer $post_id Current post ID.
		 */
		$email_headers = (array) apply_filters(
			'anpsblocks_form_email_headers',
			array(
				"Reply-To: {$reply_to}",
			),
			$_POST,
			$post_id
		);

		add_filter('wp_mail_content_type', array($this, 'enable_html_email'));

		$email = wp_mail($to, $subject, $email_content, $email_headers);

		remove_filter('wp_mail_content_type', array($this, 'enable_html_email'));

		/**
		 * Fires when a form is submitted.
		 *
		 * @param array   $_POST User submitted form data.
		 * @param array   $atts  Form block attributes.
		 * @param boolean $email True when email sends, else false.
		 */
		do_action('anpsblocks_form_submit', $_POST, $atts, $email);

		return $email;
	}

	/**
	 * Setup the email subject line, replacing any found shortcodes.
	 * Note: [email] will be replaced with the value of field-email
	 *       [name] will be replaced with the value of field-name etc.
	 *
	 * @param  array  $atts           Block attributes array.
	 * @param  string $email_field_id Email field ID.
	 * @param  string $name_field_id  Nane field ID.
	 * @return string Email subject.
	 */
	private function setup_email_subject($atts, $email_field_id, $name_field_id)
	{

		$subject = isset($atts['subject']) ? sanitize_text_field($atts['subject']) : self::default_subject();

		preg_match_all('/\[(.*?)\]/i', $subject, $matches);

		if (isset($matches[1])) {

			array_walk(
				$matches[1],
				function ($match, $key) use ($matches, &$subject, &$email_field_id, &$name_field_id) {
					$slug_match = strtolower(str_replace(' ', '', $match));

					// phpcs:disable WordPress.Security.NonceVerification.Missing
					if (__('name', 'anpsblocks') === $slug_match) {

						if (isset($_POST[$name_field_id]['value'])) {

							$name_field_value = is_array($_POST[$name_field_id]['value']) ? sanitize_text_field(implode(' ', $_POST[$name_field_id]['value'])) : sanitize_text_field($_POST[$name_field_id]['value']);
							$value            = empty($name_field_value) ? $matches[0][$key] : $name_field_value;
						} else {

							$value = $matches[0][$key];
						}
					} elseif (__('email', 'anpsblocks') === $slug_match) {

						$value = isset($_POST[$email_field_id]['value']) ? sanitize_text_field($_POST[$email_field_id]['value']) : $matches[0][$key];
					}

					/**
					 * Filter the matched shortcode value.
					 *
					 * @param string  $value      Email content.
					 * @param string  $slug_match Matched string.
					 */
					$replacement = (string) apply_filters('anpsblocks_form_shortcode_match', $value, $slug_match);

					$subject = str_replace($matches[0][$key], $replacement, $subject);
				}
			);
		}

		return $subject;
	}

	/**
	 * Enable HTML emails
	 *
	 * @return string HTML content type header
	 */
	public function enable_html_email()
	{

		return 'text/html';
	}

	/**
	 * Display the form success data
	 *
	 * @return mixed Markup for a preview of the submitted data
	 */
	public function success_message()
	{

		/**
		 * Filter the sent notice above the success message.
		 */
		$sent_notice = (string) apply_filters('anpsblocks_form_sent_notice', __('Your message was sent:', 'anpsblocks'));

		/**
		 * Filter the success message after a form submission
		 *
		 * @param mixed   Success message markup.
		 * @param string  Sent notice.
		 * @param integer Current post ID.
		 */
		$success_message = (string) apply_filters(
			'anpsblocks_form_success_message',
			sprintf(
				'<div class="anpsblocks-form__submitted">%s %s</div>',
				wp_kses_post($sent_notice),
				wp_kses_post($this->email_content)
			),
			get_the_ID()
		);

		$this->remove_url_form_hash();

		echo wp_kses_post($success_message);
	}

	/**
	 * Remove the form has from the URL in the browser address bar
	 */
	private function remove_url_form_hash()
	{

	?>

		<script type="text/javascript">
			if (window.history.replaceState && window.location.hash) {
				document.getElementById(window.location.hash.substring(1)).scrollIntoView();
				window.history.replaceState(null, null, ' ');
			}
		</script>

<?php

	}

	/**
	 * Verify recaptcha to prevent spam
	 *
	 * @param string $recaptcha_token The recaptcha token submitted with the form.
	 *
	 * @return bool True when token is valid, else false
	 */
	private function verify_recaptcha($recaptcha_token)
	{

		$verify_token_request = wp_remote_post(
			self::GCAPTCHA_VERIFY_URL,
			array(
				'timeout' => 30,
				'body'    => array(
					'secret'   => get_option('anpsblocks_google_recaptcha_secret_key'),
					'response' => $recaptcha_token,
				),
			)
		);

		if (is_wp_error($verify_token_request)) {

			return false;
		}

		$response = wp_remote_retrieve_body($verify_token_request);

		if (is_wp_error($response)) {

			return false;
		}

		$response = json_decode($response, true);

		if (!isset($response['success'])) {

			return false;
		}

		return $response['success'];
	}
}

new AnpsBlocks_Form();
