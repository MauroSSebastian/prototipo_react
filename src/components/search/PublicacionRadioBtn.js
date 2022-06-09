import React, { useState, useContext } from 'react';

const PublicacionRadioBtn = ({ label, checked, onClick }) => {
	return (
		<label>
			<input
				type='radio'
				checked={checked}
				onClick={onClick}
				className='m'
				readOnly={true}
			/>
			{label}
		</label>
	);
};

export default PublicacionRadioBtn;
