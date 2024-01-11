"use client"

import React from "react";
import { ModalDrawer } from "./modal-drawer"
import { UserAuthForm } from "./user-auth-form"
import { Button, buttonVariants } from "./ui/button";
import { set } from "date-fns";
import { cn } from "@/lib/utils";

export function SignInUpNav() {
  const [isSignInModalOpen, setIsSignInModalOpen] = React.useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = React.useState(false);

  const toggleSignInModal = () => {
    setIsSignInModalOpen(!isSignInModalOpen);
  };

  const toggleSignUpModal = () => {
    setIsSignUpModalOpen(!isSignUpModalOpen);
  };

  return (
    <>
      <Button
        onClick={toggleSignInModal}
        className={cn(
          buttonVariants({ variant: "secondary", size: "sm" }),
          "px-4"
        )}
      >
        შესვლა
      </Button>
      <ModalDrawer
        content={<UserAuthForm showAdditionalFields={false} />}
        modalTitle="შესვლა"
        modalDescription={"გთხოვთ შეიყვანოთ თქვენი მონაცემები"}
        open={isSignInModalOpen}
        setOpen={setIsSignInModalOpen}
      />

      <Button
        onClick={toggleSignUpModal}
        className={cn(
          buttonVariants({ variant: "secondary", size: "sm" }),
          "px-4"
        )}
      >
        რეგისტრაცია
      </Button>
      <ModalDrawer
        content={<UserAuthForm showAdditionalFields={true} />}
        modalTitle="რეგისტრაცია"
        modalDescription={"გთხოვთ შეიყვანოთ თქვენი მონაცემები"}
        open={isSignUpModalOpen}
        setOpen={setIsSignUpModalOpen}
      />
    </>
  )
}