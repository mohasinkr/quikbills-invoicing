import { Loader2, LucideIcon } from "lucide-react";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonWithIconProps extends ButtonProps {
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

const ButtonWithIcon = forwardRef<HTMLButtonElement, ButtonWithIconProps>(
  (
    {
      icon: Icon,
      iconPosition = "left",
      className,
      variant,
      size,
      isLoading,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        className={cn("gap-2", className)}
        variant={variant}
        size={size}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            {Icon && iconPosition === "left" && <Icon className="h-4 w-4" />}{" "}
            {children}
            {Icon && iconPosition === "right" && (
              <Icon className="h-4 w-4" />
            )}{" "}
          </>
        )}
      </Button>
    );
  }
);

ButtonWithIcon.displayName = "ButtonWithIcon";

export default ButtonWithIcon;
