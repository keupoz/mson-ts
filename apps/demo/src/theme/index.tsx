import { createTheme, ScrollArea, Select, type SelectProps, Switch, Text, Tooltip } from '@mantine/core'
import SelectClassNames from './Select.module.scss'
import SwitchClassNames from './Switch.module.scss'
import '@mantine/core/styles.css'
import '@mantine/dropzone/styles.css'
import './main.scss'

const renderSelectOption: SelectProps['renderOption'] = ({ option }) => (
  <Text span lineClamp={2} inherit title={option.label}>
    {option.label}
  </Text>
)

export const theme = createTheme({
  components: {
    ScrollArea: ScrollArea.extend({
      defaultProps: {
        scrollbarSize: 8,
      },
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
