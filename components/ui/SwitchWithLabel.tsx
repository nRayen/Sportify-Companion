import { Label, Separator, SizeTokens, Switch, XStack } from "tamagui";

type SwitchWithLabelProps = {
    label: string;
    size: SizeTokens;
    defaultChecked?: boolean;
    [key: string]: any;
}

export function SwitchWithLabel({label, size, defaultChecked, ...rest}: SwitchWithLabelProps) {
    const id = `switch-${size.toString().slice(1)}-${defaultChecked ?? ''}}`
    return (
      <XStack width={200} items="center" gap="$4">
        <Label
          pr="$0"
          justify="flex-end"
          size={size}
          htmlFor={id}
        >
          {label}
        </Label>
        <Separator minH={20} vertical />
        <Switch id={id} size={size} defaultChecked={defaultChecked}>
          <Switch.Thumb animation="bouncy" />
        </Switch>
      </XStack>
    )
  }