import Button from "../../../../components/Button"
import ButtonGroup from "../../../../components/ButtonGroup"
import Box from "../../../../components/Box"
import Columns from "../../../../components/Columns"
import Dimensions from "./Dimensions"
import GridLayout from "./GridLayout"

<Columns>
  <GridLayout />
  <ButtonGroup>
    <Box style={{ height: 36, width: 120 }} />
    <Box style={{ height: 36, width: 120 }} />
  </ButtonGroup>
</Columns>
<Columns>
  <Dimensions />
  <ButtonGroup>
    <Button priority="normal">Back</Button>
    <Button priority="high">Go</Button>
  </ButtonGroup>
</Columns>
