import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Register from "./Register"; // Adjust path as needed
import { useAuthContext } from "../../contexts/AuthContext";
import { useAuthForm } from "../../hooks/useAuthForm";
import { useRegister } from "../../hooks/useRegister";



vi.mock("../../contexts/AuthContext", () => ({
    useAuthContext: vi.fn(),
}));

vi.mock("../../hooks/useAuthForm", () => ({
    useAuthForm: vi.fn(),
}));

vi.mock("../../hooks/useRegister", () => ({
    useRegister: vi.fn(),
}));


describe("Register Component", () => {
    const mockSubmitCallback = vi.fn();

    beforeEach(() => {
        useAuthContext.mockReturnValue({
            language: 'en'
        })
    })

    useAuthForm.mockReturnValue({
        values: { email: "", password: "", rePass: "" },
        changeHandler: vi.fn(),
        submitHandler: mockSubmitCallback,
        isSubmitting: false,
        errors: {},
    })

    useRegister.mockReturnValue({
        registerCallback: vi.fn(),
        translations: {
            header: "Sign Up",
            emailPlaceholder: "Enter your email",
            passwordPlaceholder: "Enter your password",
            repeatPasswordPlaceholder: "Repeat your password",
            alreadyHaveAccount: "Already have an account?",
            loginLink: "Login",
            emailLabel: "Email",
            passwordLabel: "Password",
            repeatPasswordLabel: "Repeat Password",
        },
    });

    it("Submits the form with valid data.", async () => {
        useAuthForm.mockReturnValueOnce({
          values: { email: "test@example.com", password: "password123", rePass: "password123" },
          changeHandler: vi.fn(),
          submitHandler: mockSubmitCallback,
          isSubmitting: false,
          errors: {},
        });
    
        render(<Register />);
    
        const submitButton = screen.getByRole("button");
        fireEvent.click(submitButton);
    
        await waitFor(() => expect(mockSubmitCallback).toHaveBeenCalled());
      });


    it('Renders Register component with translated placeholders.', () => {
        render(<Register />);

        expect(screen.getByRole("registerForm")).toBeInTheDocument();

        expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Repeat your password")).toBeInTheDocument();

        expect(screen.getByText("Already have an account?")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
    });

    it('Fills the form with mismatched passwords and shows an error.', async () => {
    
        useAuthForm.mockReturnValueOnce({
            values: { email: "test@example.com", password: "12345678", rePass: "87654321" },
            changeHandler: vi.fn(),
            submitHandler: mockSubmitCallback,
            isSubmitting: false,
            errors: { rePass: 'Passwords must match' },  
        });
    
        render(<Register />);
 
        fireEvent.change(screen.getByPlaceholderText("Enter your password"), { target: { value: "12345678" } });
        fireEvent.change(screen.getByPlaceholderText("Repeat your password"), { target: { value: "87654321" } });

        await waitFor(() => {
            expect(screen.getByTestId("error-rePass")).toBeInTheDocument(); 
            expect(screen.getByTestId("error-rePass")).toHaveTextContent('Passwords must match');
        });
    });

    it("Disables submit button while submitting.", async () => {
        useAuthForm.mockReturnValueOnce({
          values: { email: "test@example.com", password: "password123", rePass: "password123" },
          changeHandler: vi.fn(),
          submitHandler: mockSubmitCallback,
          isSubmitting: true,
          errors: {},
        });
    
        render(<Register />);
    
        const submitButton = screen.getByRole('button');
        expect(submitButton).toBeDisabled();
      });
    

});
