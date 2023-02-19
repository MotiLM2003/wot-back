const donorDonationDeclined = ({ name, campignName }) => {
	console.log('donorDonationDeclined', name);
	return {
		subject: 'Your Donation  was Declined',
		html: `<tr>
        <td style=" margin-top: 1rem">
        Dear ${name},
        Thank you for attempting to donate to the ${campignName} Campaign.<br /> Unfortunately, our attempt to charge was declined. 
        Please check that your information was correct and reprocess.<br />
        Please email support@worldoftzedaka.org if you have any questions.<br />
        <p>
        Thank you, <br />
        World of Tzedaka Management
        </p>
		</td>
	</tr>
</table>
</body>
</html>
`,
	};
};

module.exports = { donorDonationDeclined };
