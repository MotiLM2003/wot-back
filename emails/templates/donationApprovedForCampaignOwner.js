const donationApprovedForCampaignOwner = ({
	ownerName,
	donationAmount,
	feeAmount,
	paymentMethod,
	campginName,
	currentDate,
	transactionID,
	donorsName,
}) => {
	return {
		subject: 'Donation Received for Your Campaign',
		html: `<tr>
        <td style="">
            <div style="margin-top: 1rem;">
                Dear <span style='font-weight:bold;color:#1979be'>${ownerName}</span><br />
				<p>I hope this email finds you well. I am writing to let you know that you have just received a donation for your campaign n behalf of <span style='font-weight:bold;color:#1979be'>${donorsName}</span>.<br />
				Your hard work and dedication have inspired others to support your cause, and this donation is a testament to the positive impact you are making in the world.</p>
            </div>
            <p style="font-weight: bold; margin-top: 1rem">

                Recept Id: ${transactionID} / ${currentDate}
            </p>
        </td>
    </tr>	<tr>
		<td style="text-align: center" ;>
			<div style="text-align: center">
				<table
					style="
						margin-left: auto;
						margin-right: auto;
						border-collapse: collapse;
						font-family: 'Courier New', Courier, monospace;
						min-width: 350px;
						margin-top:2rem
					"
				>
					<tr
						style="
							background: #ececec;
							color: #385170;
							padding: 0.7rem;
							min-width: 350px;
                            border-bottom: 1px solid #ccc;
						"
					>
						<th style="padding: 0.6rem; font-weight: bold">
							Receipt details:
						</th>
						<th style="padding: 0.6rem">Amount</th>
					</tr>
					<tr style='border-bottom: 1px solid #ccc;'>
						<td style="padding: 0.3rem; font-weight: bold;max-width:200px">
						
						 ${campginName}
						</td>
						<td style="padding: 0.3rem;font-weight:bold">${donationAmount}</td>
					</tr>
					<tr style='border-bottom: 1px solid #ccc;'>
						<td style="padding: 0.3rem; font-weight: bold">
							Transaction fee
						</td>
						<td style="padding: 0.3rem;font-weight:bold">${feeAmount}</td>
					</tr>
					<tr style='border-bottom: 1px solid #ccc;'>
						<td style="padding: 0.3rem; font-weight: bold">
							Payment method
						</td>
						<td style="padding: 0.3rem;font-weight:bold">${paymentMethod}</td>
					</tr>
				</table>
			</div>
		</td>
	</tr>
</table>
</body>
</html>
`,
	};
};

module.exports = { donationApprovedForCampaignOwner };
