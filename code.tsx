const { widget } = figma
const { AutoLayout, Input, Frame, useSyncedState } = widget

type Columns = {
  names: string[]
  width: number[]
  placeholder: string[]
}

function WpPostTable() {
  const names = ['page title', 'path', 'template', 'memo']
  const defaultWidth = [200, 200, 150, 200]
  const [postName, setPostName] = useSyncedState('postName', '')
  const [columns, setColumns] = useSyncedState<Columns>('colums', {
    placeholder: names,
    width: defaultWidth,
    names: names
  })

  const borderColor = '#696969'
  const pageTitleBgColor = '#e0ffff'

  return (
    <AutoLayout width={600} direction="vertical" verticalAlignItems="center">
      <Input
        placeholder="table title"
        value={postName}
        width="fill-parent"
        fontSize={24}
        horizontalAlignText="left"
        onTextEditEnd={(event) => setPostName(event.characters)}
      />

      <AutoLayout
        width={600}
        direction="horizontal"
        verticalAlignItems="center"
        fill="#fff"
      >
        {columns.names.map((value, i, names) => {
          return (
            <Input
              placeholder={value}
              value=""
              width={i > names.length ? 200 : columns.width[i]}
              fontSize={24}
              horizontalAlignText="center"
              onTextEditEnd={(e) => console.log(e.characters)}
            />
          )
        })}
      </AutoLayout>
    </AutoLayout>
  )
}

widget.register(WpPostTable)
