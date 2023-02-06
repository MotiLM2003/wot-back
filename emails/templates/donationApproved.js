const donationApproved = ({
	name,
	donationAmount,
	feeAmount,
	paymentMethod,
	campginName,
	currentDate,
	transactionID,
}) => {
	return {
		subject: 'Thank you for your donation',
		html: `<tr>
        <td style="text-align: center; margin-top: 1rem">
            <div style="margin-top: 1rem">
                Dear <span style='font-weight:bold;color:#1979be'>${name}</span>, Thank you for your generous donation through
                the<br />
                World Of Tzedaka website! Your support will make a huge impact in
                <br />
                helping those in need. Your kindness is greatly appreciated. <br />
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

module.exports = { donationApproved };
