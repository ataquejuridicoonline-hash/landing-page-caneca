import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 title: "FinaSub | Canecas personalizadas a partir de 10 unidades",
 icons: {icon:"/finasub-logo.png",apple:"/finasub-logo.png"},
 description: "Canecas personalizadas em quantidade para empresas, festas e eventos. Escolha uma inspiração e monte seu pedido a partir de 10 unidades.",
 robots: {index:false, follow:false},
 openGraph: {title:"Sua ideia. Em muitas canecas. | FinaSub", description:"Personalização em quantidade para empresas, festas e eventos. A partir de 10 unidades.", images:["/mugs.jpg"],locale:"pt_BR",type:"website"}
};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body>{children}</body></html>; }

