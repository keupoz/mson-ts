import { createTheme, ScrollArea, Select, type SelectProps, Switch, Text, Tooltip } from '@mantine/core'
import ScrollAreaClassNames from './styles/ScrollArea.module.scss'
import SelectClassNames from './styles/Select.module.scss'
import SwitchClassNames from './styles/Switch.module.scss'
import '@mantine/core/styles.css'
import './styles/main.scss'

const renderSelectOption: SelectProps['renderOption'] = ({ option }) => (
  <Text span lineClamp={2} inherit title={option.label}>
    {option.label}
  </Text>
)

export const theme = createTheme({
  components: {
    ScrollArea: ScrollArea.extend({
      classNames: ScrollAreaClassNames,
    }),

    Select: Select.extend({
      classNames: SelectClassNames,
      defaultProps: {
        searchable: true,
        nothingFoundMessage: 'Nothing found',
        placeholder: 'Pick value',
        renderOption: renderSelectOption,
      },
    }),

    Switch: Switch.extend({
      classNames: SwitchClassNames,
      defaultProps: {
        labelPosition: 'left',
      },
    }),

    Tooltip: Tooltip.extend({
      defaultProps: {
        withArrow: true,
        arrowSize: 8,
        zIndex: 500,
      },
    }),
  },
})
