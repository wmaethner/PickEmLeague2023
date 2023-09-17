import Column from "./column";
import Row from "./row";

export interface ContainerProps {
  children?: React.ReactNode | undefined;
}

export default function Container(props: ContainerProps) {
  return (
    <Row>
      <Column>
        {props.children}
      </Column>
    </Row>
  )
}