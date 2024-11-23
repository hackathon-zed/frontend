"use client";

import CustomButton from "@/components/ui/customButton";
import { X } from "lucide-react";
import { FC, ReactNode, useEffect, useRef } from "react";

interface MobileMenuProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right" | "top" | "bottom";
}

interface SheetCloseButtonProps {
  onClose: () => void;
}

export const CloseMenu: FC<SheetCloseButtonProps> = ({ onClose }) => (
  <CustomButton
    variant="outline"
    onClick={onClose}
    className="absolute top-4 right-4"
  >
    <X />
  </CustomButton>
);

export const MobileMenu: FC<MobileMenuProps> = ({
  children,
  isOpen,
  onClose,
  position = "left",
}) => {
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close menu on Escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, onClose]);

  // Close menu on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/50 backdrop-blur-sm transition-all z-20"
          onClick={onClose}
        />
      )}

      {/* Menu Content */}
      <div
        ref={mobileMenuRef}
        className={`fixed ${
          isOpen
            ? "translate-x-0"
            : position === "right"
            ? "translate-x-full"
            : "-translate-x-full"
        } ${
          position === "right" ? "right-0" : "left-0"
        } top-0 bottom-0 w-full sm:w-[360px] bg-background transition-transform duration-500 ease-in-out shadow-lg z-20`}
      >
        <div className="p-6">{children}</div>
      </div>
    </>
  );
};
