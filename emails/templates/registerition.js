const register = (options) => {
	return {
		subject: 'Registration for World of Tzedaka Campaign Manager Access',
		html: `<div class='max-width:400px;padding:5px'>
         <p style='font-weight:bold'>Dear ${options.name},</p>
         <p>
         Thank you for registering with World of Tzedaka as a Campaign Manager.<br /> We are grateful
         for your interest in using our platform to create and manage fundraising campaigns to<br />
         support charitable causes.
         </p>
         <p>
         As a Campaign Manager, you will have the ability to create,
          manage, and promote<br /> campaigns to a wide network of potential donors. <br />
          However, before we can grant you full access to our platform, we need to verify 
          your credentials and approve your account.
         
         </p>

         <p>
         We review each application carefully to ensure that our platform is being used for
          legitimate, ethical, and lawful purposes.<br /> Our review process may take a few business days.<br />
           and we will notify you as soon as your account has been approved or if we need any additional
            information.
         </p>

         <p>
         In the meantime, please feel free to email us at info@worldoftzedaka.org <br/>
         if you have any questions or need assistance with your account. Our team is 
         always available to help.
         </p>

         
         <p>
         Thank you again for your interest in World of Tzedaka,
         and we look forward to supporting your fundraising efforts.
         </p>

        <p style='font-weight:bold'>
        Best regards,<br>
        World of Tzedaka Management
        </p>
        </div>f
        </html>`,
	};
};

module.exports = { register };
