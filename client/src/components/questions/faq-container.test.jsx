import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import FAQ from "./faq-container";
import { useGetLang } from "../../hooks/useTranslator";
import { useAuthContext } from "../../contexts/AuthContext";

const { mockTranslations } = vi.hoisted(() => {
    const mockQuestions = [
        { question: "What is React?", answer: "React is a JavaScript library for building user interfaces." },
        { question: "What is testing?", answer: "Testing is the process of evaluating software to identify errors." }
    ];

    const mockTranslations = {
        questions: mockQuestions,
        staticContent: {
            header: "Ask a Question",
            label: "Your question",
            placeholder: "Write your question here",
            submitButton: "Submit"
        }
    };

    return { mockQuestions, mockTranslations };
});

vi.mock("../../contexts/AuthContext", () => ({
    useAuthContext: vi.fn(),
}));

vi.mock("../../hooks/useTranslator", () => ({
    useGetLang: vi.fn(),
}));

const mockSubmitCallback = vi.fn();

vi.mock("../../hooks/usePostQuestions", () => ({
    usePostQuestions: vi.fn(() => ({ submitCallback: mockSubmitCallback })),
}));

vi.mock("../../hooks/useForm", () => ({
    useForm: vi.fn(() => ({
        values: { text: "" },
        submitHandler: vi.fn((event) => {
            event.preventDefault();
            mockSubmitCallback({ text: "How to test React?" });
        }),
        changeHandler: vi.fn(),
    })),
}));

describe("FAQ Component", () => {
    afterEach(() => {
        vi.restoreAllMocks();
        mockSubmitCallback.mockReset();
    });

    it("renders FAQ questions correctly", () => {
        useAuthContext.mockReturnValue({ language: "en" });
        useGetLang.mockReturnValue(mockTranslations);

        render(<FAQ />);

        expect(screen.getByText("What is React?")).toBeInTheDocument();
        expect(screen.getByText("React is a JavaScript library for building user interfaces.")).toBeInTheDocument();
        expect(screen.getByText("Ask a Question")).toBeInTheDocument();
        expect(screen.getByText("Your question")).toBeInTheDocument();
    });

    it("sends a question when clicking submit", async () => {
        useAuthContext.mockReturnValue({ language: "en" });
        useGetLang.mockReturnValue(mockTranslations);

        render(<FAQ />);

        const inputField = screen.getByPlaceholderText("Write your question here");
        fireEvent.change(inputField, { target: { value: "How to test React?" } });

        const button = screen.getByText("Submit");
        fireEvent.click(button);

        await waitFor(() => expect(mockSubmitCallback).toHaveBeenCalledTimes(1));
        expect(mockSubmitCallback).toHaveBeenCalledWith({ text: "How to test React?" });
    });

});
