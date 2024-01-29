import type { Metadata } from "next";
import { Alumni_Sans as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { siteConfig } from "@/config/site";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: [
		{
			url: "/icon.svg",
			href: "/icon.svg",
		},
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body
					className={cn(
						"min-h-screen max-h-screen text-xl grid grid-rows-[88px_1fr] bg-background font-sans antialiased px-6",
						fontSans.variable
					)}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<Header />
						{children}
						<Toaster position="bottom-left" />
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
