/**
 * ==================================================
 *   _____ _ _ _             _
 *  |     |_| | |___ ___ ___|_|_ _ _____
 *  | | | | | | | -_|   |   | | | |     |
 *  |_|_|_|_|_|_|___|_|_|_|_|_|___|_|_|_|
 *
 * ==================================================
 *
 * Copyright (c) 2025 Project Millennium
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { DialogButton, IconsModule, SteamSpinner } from '@steambrew/client';
import { useState } from 'react';

interface ErrorModalProps {
	header: string;
	body: string;
	showIcon?: boolean;
	icon?: React.ReactNode;

	options?: {
		buttonText?: string;
		onClick?: () => void;
	};
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ header, body, options, showIcon, icon }) => {
	const [callBackRunning, setCallBackRunning] = useState(false);

	const DelegateCallback = async (callback: () => void) => {
		if (callBackRunning) {
			return;
		}

		setCallBackRunning(true);
		await callback();
		setCallBackRunning(false);
	};

	return (
		<div className="MillenniumErrorModal_Container">
			{showIcon && (icon ? icon : <IconsModule.Caution width="64" />)}

			<div className="MillenniumErrorModal_Header">{header}</div>
			<div className="MillenniumErrorModal_Text">{body}</div>

			{options && (
				<DialogButton disabled={callBackRunning} className="MillenniumErrorModal_Button" onClick={DelegateCallback.bind(null, options.onClick)}>
					{options.buttonText}
				</DialogButton>
			)}
		</div>
	);
};
