import Image from "next/image";
import { FormLogin } from "../../components/forms/formulario-login";

export default function Login() {
	return (
		<div className="grid grid-cols-2 mt-14 ml-20">
			<FormLogin />
			<div className="flex justify-center  items-center w-10/12">
				<Image
					src={"/login-image.jpg"}
					alt=""
					width={840}
					height={840}
					quality={80}
					priority={true}
				/>
			</div>
		</div>
	);
}
