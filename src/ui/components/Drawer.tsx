import { Drawer } from "vaul";
import { ReactNode } from "react";
import "./Drawer.css";

interface DrawerProps {
  trigger: ReactNode;
  children: ReactNode;
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  nested?: boolean;
}

export const CustomDrawer = ({
  trigger,
  children,
  title,
  description,
  open,
  onOpenChange,
  nested = false,
}: DrawerProps) => {
  const RootComponent = nested ? Drawer.NestedRoot : Drawer.Root;

  return (
    <RootComponent open={open} onOpenChange={onOpenChange}>
      <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="drawer-overlay" />
        <Drawer.Content className="drawer-content">
          <div className="drawer-handle" />
          <div className="drawer-header">
            {title && (
              <Drawer.Title className="drawer-title">{title}</Drawer.Title>
            )}
            {description && (
              <Drawer.Description className="drawer-description">
                {description}
              </Drawer.Description>
            )}
          </div>
          <div className="drawer-body">{children}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </RootComponent>
  );
};

export const NestedDrawer = (props: Omit<DrawerProps, "nested">) => {
  return <CustomDrawer {...props} nested={true} />;
};
