import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router";
import moment from "moment";
import config from "../../../config.js";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import AnimatedComponents from "../animatedComponent/AnimatedComponents.jsx";
import Footer from "../../footer/Footer.jsx";
import {Button} from "@headlessui/react";
import {HeaderMain} from "../../main/ComponentsMain.jsx";

export default function Validator() {
	const params = useParams();
	const [token, setToken] = useState("");
	const [message, setMessage] = useState("");
	const captchaRef = useRef(null);
	const navigate = useNavigate();
	
	useEffect(() => {
		captchaRef?.current?.resetCaptcha();
	}, [])
	
	useEffect(() => {
		if (Object.keys(params).length === 0 || !params) {
			alert("Nenhum parâmetro foi obtido. Por favor tente novamente e verifique o link que você usou para acessar este recurso. Você será direcionado para a home.");
			navigate("/", {replace: true});
		}
	}, [params]);
	
	const confirmAction = async ({token, id, action, code, datetimeCreate}) => {
		const res = await fetch(`${config.modQueueServer}/api/verify-code`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				token,
				id,
				action,
				code,
				datetimeCreate
			}),
		});
		
		const data = await res.json();
		// console.log(data);
		
		if (data.success) {
			console.log("OK!");
			setMessage("Tudo certo! Em instantes a solicitação será concluída. É só aguardar. Você pode fechar a página. Quando a solicitação tiver sido concluída, uma mensagem será enviada no canal de logs do Discord.");
			captchaRef.current.resetCaptcha();
		} else {
			setMessage(data.message || JSON.stringify(data));
			captchaRef.current.resetCaptcha();
		}
	}
	
	const handleSubmit = (e) => {
		e.preventDefault();
		e.stopPropagation();
		
		if (!token) {
			setMessage('Por favor, complete o captcha antes de enviar.');
			return;
		}
		
		let [id, datetimeCreate, action, code] = params.id.split('A');
		datetimeCreate = moment(datetimeCreate, "x").format("YYYY-MM-DD HH:mm:ss");
		
		confirmAction({token, id, action, code, datetimeCreate}).then(() => {
			console.log("OK!");
		});
	}
	
	return (
		<div className="flex align-center justify-center">
			<div className="container mx-3 my-8 lg:my-10 min-h-[90vh] flex justify-between flex-col">
				<HeaderMain/>
				<div className={""}>
					<main className="flex flex-col items-start gap-8 max-w-[580px]">
						<h2 className={"text-balance font-bold text-3xl"}>Preencha o captcha para finalizar a validação</h2>
						
						<form className="flex flex-col items-start gap-8" onSubmit={handleSubmit}>
							<div>
								<HCaptcha
									sitekey={import.meta.env.VITE_SITE_KEY}
									onVerify={(token) => {
										setToken(token);
									}}
									ref={captchaRef}
								/>
							</div>
							
							{
								message && (
									<AnimatedComponents>
										<div className={"flex flex-wrap gap-2 items-center text-center p-3 rounded " + (message?.toLowerCase().includes("tudo certo!") ? "bg-green-500/5 border border-green-300/25 text-green-600" : "bg-orange-500/5 border border-orange-300/25 text-orange-300")}>
											<p className={"text-balance"}>{message}</p>
										</div>
									</AnimatedComponents>
								)
							}
							
							<div className={"flex flex-wrap gap-2"}>
								<Button type="submit" className="inline-flex items-center gap-2 rounded-md bg-orange-600 px-3 py-1.5 text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700 focus-headless">
									Confirmar
								</Button>
							</div>
						</form>
					</main>
				</div>
				<Footer/>
			</div>
		</div>
	)
}
