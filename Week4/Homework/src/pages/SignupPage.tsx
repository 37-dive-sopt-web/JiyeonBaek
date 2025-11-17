import Step1 from "../components/signup/Step1";
import Step2 from "../components/signup/Step2";
import Step3 from "../components/signup/Step3";
import { link, title } from "../styles/typography.css";
import BackIcon from "../assets/icons/arrow-back.svg?react";
import { useSignupForm } from "../hooks/useSignupForm";
import { authContainer, authLinkContainer, backIcon } from "./AuthPage.css";
import { Link } from "react-router-dom";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

export const SignupPage = () => {
  useAuthRedirect();
  const {
    step,
    form,
    isStep1Valid,
    isStep2Valid,
    isStep3Valid,
    idErrorMessage,
    passwordErrorMessage,
    emailErrorMessage,
    isLoading,
    handleBack,
    handleNextStep,
    handleChange,
    handleSignup,
  } = useSignupForm();

  return (
    <main className={authContainer}>
      <button type="button" onClick={handleBack} aria-label="뒤로 가기">
        <BackIcon className={backIcon} />
      </button>
      <h1 className={title}>회원가입</h1>
      {step === 1 && (
        <Step1
          id={form.id}
          onChangeId={handleChange("id")}
          onNext={handleNextStep}
          isValid={isStep1Valid}
          errorMessage={idErrorMessage}
        />
      )}
      {step === 2 && (
        <Step2
          password={form.password}
          passwordConfirm={form.passwordConfirm}
          onChangePassword={handleChange("password")}
          onChangePasswordConfirm={handleChange("passwordConfirm")}
          onNext={handleNextStep}
          isValid={isStep2Valid}
          passwordErrorMessage={passwordErrorMessage}
        />
      )}
      {step === 3 && (
        <Step3
          name={form.name}
          email={form.email}
          age={form.age}
          onChangeName={handleChange("name")}
          onChangeEmail={handleChange("email")}
          onChangeAge={handleChange("age")}
          onSubmit={handleSignup}
          isValid={isStep3Valid}
          emailErrorMessage={emailErrorMessage}
          isLoading={isLoading}
        />
      )}
      <div className={authLinkContainer}>
        <p>이미 회원이신가요?</p>
        <Link to="/login" className={link}>
          로그인
        </Link>
      </div>
    </main>
  );
};

export default SignupPage;
