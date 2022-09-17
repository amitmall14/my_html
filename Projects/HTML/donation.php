<?php
class ControllerCheckoutDonation extends Controller {

    public function calculatehash() {

        if(strcasecmp($_SERVER['REQUEST_METHOD'], 'POST') == 0){
        	//Request hash
        	$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
        	if(strcasecmp($contentType, 'application/json') == 0){
        		$data = json_decode(file_get_contents('php://input'));
        		$hash=hash('sha512', $data->key.'|'.$data->txnid.'|'.$data->amount.'|'.$data->pinfo.'|'.$data->fname.'|'.$data->email.'|'.$data->udf1.'||||'.$data->udf5.'||||||'.$data->salt);
        		$json=array();
        		$json['success'] = $hash;
            	echo json_encode($json);

        	}
        	exit(0);
        }
    }

	public function index() {

        $this->load->language('checkout/failure');

		$this->document->setTitle('Donation');

		$data['breadcrumbs'] = array();

		$data['breadcrumbs'][] = array(
			'text' => $this->language->get('text_home'),
			'href' => $this->url->link('common/home')
		);


		$data['breadcrumbs'][] = array(
			'text' => "Donation",
			'href' => '/donation',
		);

	    $data['action'] = $this->url->link('checkout/donation/callback', '', true);
	    $data['calculatehash'] = $this->url->link('checkout/donation/calculatehash', '', true);
	    $data['failure'] = $this->url->link('checkout/failure', '', true);

		$data['continue'] = $this->url->link('common/home');
        $data['txnorderid'] = "Txn" . rand(10000,99999999);

		$data['column_left'] = $this->load->controller('common/column_left');
		$data['column_right'] = $this->load->controller('common/column_right');
		$data['content_top'] = $this->load->controller('common/content_top');
		$data['content_bottom'] = $this->load->controller('common/content_bottom');
		$data['footer'] = $this->load->controller('common/footer');
		$data['header'] = $this->load->controller('common/header');


        $data['pg_type'] = $this->request->get['pg_type'];
        // if($data['pg_type'] == 'paytm') {
        //     $data['paytm_config'] = $this->getPaytmConfiguration();
        // }

		$this->response->setOutput($this->load->view('account/donation', $data));

	}

	public function calculatePaytmChecksum() {


        require_once(DIR_SYSTEM . 'library/paytm/PaytmHelper.php');
        require_once(DIR_SYSTEM . 'library/paytm/PaytmChecksum.php');

        $this->load->language('extension/payment/paytm');
		$this->load->model('extension/payment/paytm');
		$this->load->model('checkout/order');

		$order_id = $this->model_checkout_order->addPayuOrder($this->request->get);

	    // $order_id = PaytmHelper::getPaytmOrderId($order_info['order_id']);

		$cust_id = $email = $mobile_no = "";
		if(isset($order_info['telephone'])){
			$mobile_no = preg_replace('/\D/', '', $order_info['telephone']);
		}

		if(!empty($order_info['email'])){
			$cust_id = $email = trim($order_info['email']);
		} else if(!empty($order_info['customer_id'])){
			$cust_id = $order_info['customer_id'];
		}else{
			$cust_id = "CUST_".$order_id;
		}

		$amount = $this->currency->format($order_info['total'], $order_info['currency_code'], $order_info['currency_value'], false);

		$parameters = array(
			"MID" 				=> $this->config->get('payment_paytm_merchant_id'),
			"WEBSITE" 			=> $this->config->get('payment_paytm_website'),
			"INDUSTRY_TYPE_ID" 	=> $this->config->get('payment_paytm_industry_type'),
			"CALLBACK_URL" 		=> $this->url->link('checkout/donation/callbackPaytm', '', true),
			"ORDER_ID"  		=> "Txn" . $order_id, //$order_id,
			"CHANNEL_ID" 		=> PaytmConstants::CHANNEL_ID,
			"CUST_ID" 			=> $this->request->get['email'], //$cust_id,
			"TXN_AMOUNT" 		=> $this->request->get['amount'], //$amount,
			"MOBILE_NO" 		=> $this->request->get['mobile'], //$mobile_no,
			"EMAIL" 			=> $this->request->get['email'], //$email
		);

		$parameters["CHECKSUMHASH"]		= PaytmChecksum::generateSignature($parameters, $this->config->get('payment_paytm_merchant_key'));
		$parameters["X-REQUEST-ID"] 	=  PaytmConstants::X_REQUEST_ID;

		$data['paytm_fields']			= $parameters;
		$data['action']					= PaytmHelper::getTransactionURL($this->config->get('payment_paytm_environment'));
		$data['button_confirm']			= $this->language->get('button_confirm');

		echo json_encode($data);
	}

	private function getCallbackUrl(){
		if(!empty(PaytmConstants::CUSTOM_CALLBACK_URL)){
			return PaytmConstants::CUSTOM_CALLBACK_URL;
		}else{
			return $this->url->link('extension/payment/paytm/callback');
		}
	}

	public function callbackPaytm(){

	    require_once(DIR_SYSTEM . 'library/paytm/PaytmHelper.php');
        require_once(DIR_SYSTEM . 'library/paytm/PaytmChecksum.php');

        // $post_data = array();
	   // $post_data= array('CURRENCY' => 'INR',
	   //                 'GATEWAYNAME' => 'WALLET',
	   //                  'RESPMSG' => 'Txn Success',
	   //                  'BANKNAME' => 'WALLET',
	   //                  'PAYMENTMODE' => 'PPI',
	   //                  'MID' => 'WrJlEd41254555691379',
	   //                  'RESPCODE' => '01',
	   //                  'TXNID' => '20200524111212800110168351601572700',
	   //                  'TXNAMOUNT' => '1.00',
	   //                  'ORDERID' => 'Txn249',
	   //                  'STATUS' => 'TXN_SUCCESS',
	   //                  'BANKTXNID' => '62502576',
	   //                  'TXNDATE' => '2020-05-24 16:58:43.0',
	   //                  'CHECKSUMHASH' => 'Z/bunM9B+aEFmhB8i2JCtvNke8N6RaFYirF6Zx9bQap6XbKBl7N+pEcUmcx/7Vn/ZnkQQ0ReY7Dx5tyRkiNV16vTTlHdLSJpbJ+pi89ijag='


	   //         );
	   // $this->request->post =  $post_data;

		if(!empty($this->request->post)){
			//print_r($this->request->post);
			if(!empty($this->request->post['CHECKSUMHASH'])){
				$post_checksum = $this->request->post['CHECKSUMHASH'];
				unset($this->request->post['CHECKSUMHASH']);
			}else{
				$post_checksum = "";
			}

			$isValidChecksum = PaytmChecksum::verifySignature($this->request->post, $this->config->get("payment_paytm_merchant_key"), $post_checksum);

            if($isValidChecksum === true && $this->request->post['RESPMSG'] == 'Txn Success'){

                $this->load->model('checkout/order');
                $order_id = explode("Txn", $this->request->post['ORDERID']);

    			$order_info = $this->model_checkout_order->getPaytmOrder($order_id[1]);

    			$order_detail = unserialize($order_info['response']);
                //print_r($order_detail);
                //die;
    			$data['id'] = $order_id[1];
    			$data['amount'] = $order_detail[amount];
    			$data['email'] = $order_detail[email];
    			$data['pan'] = $order_detail[pan];
    			$data['address1'] = $order_detail[address];
    			$data['date'] = date('d-m-Y');
    			$data['phone'] = $order_detail[mobile];
    			$data['firstname'] = $order_detail[name];
    			$data['mode'] = 'PAYTM('.$this->request->post[BANKNAME] .'-'.$this->request->post[PAYMENTMODE].')';
    			$data['txnid'] = $this->request->post['ORDERID'];
                // echo '<pre>';
                // print_r($data);
                // die;

    			$this->load->view('checkout/pdf', $data);
                $id = $order_id[1];
    			$filename = "Receipt-TSF-OR-$id.html";

    			file_put_contents(DIR_DOWNLOAD."$filename",$this->load->view('checkout/pdf', $data));
    			chmod(DIR_DOWNLOAD."$filename", fileperms(DIR_DOWNLOAD."$filename") | 128 + 16 + 2);

    			$html = file_get_contents(DIR_DOWNLOAD."$filename");

    			require_once(DIR_SYSTEM.'TCPDF/tcpdf.php') ;

    		    $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, [183, 194], true, 'UTF-8', false);

                // set default monospaced font
                $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

                // set title of pdf
                $pdf->SetTitle('Donaton Receipt');

                // set margins
                $pdf->SetMargins(10, 10, 10, 10);
                $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
                $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

                // set header and footer in pdf
                $pdf->setPrintHeader(false);
                $pdf->setPrintFooter(false);
                $pdf->setListIndentWidth(3);

                // set auto page breaks
                $pdf->SetAutoPageBreak(FALSE);

                // set image scale factor
                $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

                $pdf->AddPage('','','');

                $pdf->SetFont('times', '', 10.5);

                $pdf->writeHTML($html, true, false, false, false, '');

    			if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
    			    require_once(dirname(__FILE__).'/lang/eng.php');

    			}
    			$filename_pdf = "Receipt-TSF-OR-$id.pdf";

    			file_put_contents(DIR_DOWNLOAD."$filename_pdf",$pdf->Output($filename_pdf, 'S'));
    			chmod(DIR_DOWNLOAD."$filename_pdf", fileperms(DIR_DOWNLOAD."$filename_pdf") | 128 + 16 + 2);

    			//Mail
    		//	require_once(DIR_SYSTEM.'PHPMailer/PHPMailerAutoload.php');


    			$mail_subject = "Donation Receipt - The Sewak Foundation";
    			$mail_body = "Dear ".$order_detail[name].",<br/><br/>";

    			$mail_body .= "Thank you so much for your very generous donation of Rs. ".$order_detail[amount]." to The Sewak Foundation.<br/>";

    			$mail_body .= "Please find below the attached payment details of the donation you have made.<br/><br/>";
                $mail_body .= "Link: https://www.thesewakfoundation.org/storage/download/".$filename_pdf."<br/><br/>";
    			$mail_body .= "Thanks & Regards,<br/>";
    			$mail_body .= "Team The Sewak Foundation";

                $mail = new Mail();

        		$mail->parameter = $this->config->get('config_mail_parameter');
        		$mail->smtp_hostname = $this->config->get('config_mail_smtp_hostname');
        		$mail->smtp_username = $this->config->get('config_mail_smtp_username');
        		$mail->smtp_password = html_entity_decode($this->config->get('config_mail_smtp_password'), ENT_QUOTES, 'UTF-8');
        		$mail->smtp_port = $this->config->get('config_mail_smtp_port');
        		$mail->smtp_timeout = $this->config->get('config_mail_smtp_timeout');

                $emails = array('figmanets@gmail.com',$this->config->get('config_mail_smtp_username'), $order_detail[email]);

        		$mail->setFrom($this->config->get('config_email'));
        		$mail->setSender(html_entity_decode($this->config->get('config_name'), ENT_QUOTES, 'UTF-8'));
        		$mail->setSubject($mail_subject);
        	    $mail->setHtml($mail_body);
        	    $mail->addAttachment(DIR_DOWNLOAD.$filename_pdf);
        	    foreach($emails as $email) {
        	            $mail->setTo($email);
        	        	if($mail->send()) {
        	        	    //echo "sent!";
        	        	} else {
        	        	    //echo "not";
        	        	}

        	    }
    			$this->response->redirect($this->url->link('checkout/success'));


			} else {
				// $this->session->data['error'] = $this->language->get('error_checksum_mismatch');
				// $this->preRedirect($data);
				$this->response->redirect($this->url->link('checkout/failure'));
			}
		}else{
            // $this->preRedirect($data);
            $this->response->redirect($this->url->link('checkout/failure'));
		}
	}

	public function callback(){


		if($_POST[txnid] !='' && $_POST[status]=='success' && $_POST[encryptedPaymentId]!='' && $_POST[payuMoneyId] !='' && $_POST[txnStatus] =='SUCCESS') {


			$this->load->model('checkout/order');

			$id = $this->model_checkout_order->addPayuOrder($_POST);

			$data['id'] = $id;
			$data['amount'] = $_POST[amount];
			$data['email'] = $_POST[email];
			$data['address1'] = $_POST[address1];
			$data['pan'] = $_POST[udf1];
			$data['date'] = date('d-m-Y');
			$data['phone'] = $_POST[phone];
			$data['firstname'] = $_POST[firstname];
			$data['mode'] = $_POST[mode] .'('.$_POST[PG_TYPE].')';
			$data['txnid'] = $_POST[txnid];
			$data['mode'] = 'Payu';

			$this->load->view('checkout/pdf', $data);

			$filename = "Receipt-TSF-OR-$id.html";

			file_put_contents(DIR_DOWNLOAD."$filename",$this->load->view('checkout/pdf', $data));
			chmod(DIR_DOWNLOAD."$filename", fileperms(DIR_DOWNLOAD."$filename") | 128 + 16 + 2);

			$html = file_get_contents(DIR_DOWNLOAD."$filename");

			require_once(DIR_SYSTEM.'TCPDF/tcpdf.php') ;

		    $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, [183, 194], true, 'UTF-8', false);

            // set default monospaced font
            $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

            // set title of pdf
            $pdf->SetTitle('Donaton Receipt');

            // set margins
            $pdf->SetMargins(10, 10, 10, 10);
            $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
            $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

            // set header and footer in pdf
            $pdf->setPrintHeader(false);
            $pdf->setPrintFooter(false);
            $pdf->setListIndentWidth(3);

            // set auto page breaks
            $pdf->SetAutoPageBreak(FALSE); //TRUE, 11

            // set image scale factor
            $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

            $pdf->AddPage('','','');

            $pdf->SetFont('times', '', 10.5);

            $pdf->writeHTML($html, true, false, false, false, '');

			if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
			    require_once(dirname(__FILE__).'/lang/eng.php');

			}
			$filename_pdf = "Receipt-TSF-OR-$id.pdf";

			file_put_contents(DIR_DOWNLOAD."$filename_pdf",$pdf->Output($filename_pdf, 'S'));
			chmod(DIR_DOWNLOAD."$filename_pdf", fileperms(DIR_DOWNLOAD."$filename_pdf") | 128 + 16 + 2);

			//Mail
		//	require_once(DIR_SYSTEM.'PHPMailer/PHPMailerAutoload.php');


			$mail_subject = "Donation Receipt - The Sewak Foundation";
			$mail_body = "Dear ".$_POST[firstname].",<br/><br/>";

			$mail_body .= "Thank you so much for your very generous donation of Rs. ".$_POST[amount]." to The Sewak Foundation.<br/>";

			$mail_body .= "Please find below the attached payment details of the donation you have made.<br/><br/>";
            $mail_body .= "Link: https://www.thesewakfoundation.org/storage/download/".$filename_pdf."<br/><br/>";
			$mail_body .= "Thanks & Regards,<br/>";
			$mail_body .= "Team The Sewak Foundation";

            $mail = new Mail();

    		$mail->parameter = $this->config->get('config_mail_parameter');
    		$mail->smtp_hostname = $this->config->get('config_mail_smtp_hostname');
    		$mail->smtp_username = $this->config->get('config_mail_smtp_username');
    		$mail->smtp_password = html_entity_decode($this->config->get('config_mail_smtp_password'), ENT_QUOTES, 'UTF-8');
    		$mail->smtp_port = $this->config->get('config_mail_smtp_port');
    		$mail->smtp_timeout = $this->config->get('config_mail_smtp_timeout');

            $emails = array('figmanets@gmail.com',$this->config->get('config_mail_smtp_username'), $_POST[email]);

    		$mail->setFrom($this->config->get('config_email'));
    		$mail->setSender(html_entity_decode($this->config->get('config_name'), ENT_QUOTES, 'UTF-8'));
    		$mail->setSubject($mail_subject);
    	    $mail->setHtml($mail_body);
    	    $mail->addAttachment(DIR_DOWNLOAD.$filename_pdf);
    	    foreach($emails as $email) {
    	            $mail->setTo($email);
    	        	if($mail->send()) {
    	        	    echo "sent!";
    	        	} else {
    	        	    echo "not";
    	        	}

    	    }
			$this->response->redirect($this->url->link('checkout/success'));
		//	die;


		} else {

			$this->response->redirect($this->url->link('checkout/failure'));
		}


	}




} ?>
