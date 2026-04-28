import { useMutation } from "@tanstack/react-query";
import { postJson } from "@/lib/api";

export type AuthPayload = {
	email: string;
	password: string;
};

export type AuthResponse = {
	message: string;
	user: {
		id: string;
		email?: string | null;
	} | null;
	session: {
		access_token: string;
		refresh_token: string;
	} | null;
};

export const login = (payload: AuthPayload) =>
	postJson<AuthResponse>({ path: "/login", body: payload });

export const signup = (payload: AuthPayload) =>
	postJson<AuthResponse>({ path: "/signup", body: payload });

export const useLoginMutation = () =>
	useMutation({
		mutationFn: login,
	});

export const useSignUpMutation = () =>
	useMutation({
		mutationFn: signup,
	});
