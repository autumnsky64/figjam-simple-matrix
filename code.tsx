const { widget } = figma
const { AutoLayout, Input, Frame, useSyncedState } = widget

type Columns = {
  names: string[]
  width: number[]
  placeholder: string[]
}

function WpPostTable() {
  const defaultNames = ['page title', 'path', 'template', 'memo']
  const defaultWidth = [200, 200, 150, 200]
  const [postName, setPostName] = useSyncedState('postName', '')
  const [columns, setColumns] = useSyncedState<Columns>('colums', {
    placeholder: defaultNames,
    width: defaultWidth,
    names: defaultNames
  })

  const borderColor = '#696969'
  const pageTitleBgColor = '#e0ffff'

  return (
    <AutoLayout
      width={600}
      direction="vertical"
      verticalAlignItems="center"
      padding={{ vertical: 16 }}
    >
      <Input
        placeholder="table title"
        value={postName}
        width="fill-parent"
        fontSize={32}
        horizontalAlignText="left"
        onTextEditEnd={(event) => setPostName(event.characters)}
      />

      <AutoLayout
        width={600}
        direction="horizontal"
        verticalAlignItems="center"
        fill="#fff"
        padding={{ vertical: 16 }}
      >
        {columns.names.map((name, i, names) => {
          return (
            <Input
              placeholder={defaultNames[i]}
              value={name}
              width={i > names.length ? 200 : columns.width[i]}
              fontSize={24}
              horizontalAlignText="center"
              onTextEditEnd={(event) => {
                const { names, ...rest } = columns
                const newNames = [...names]
                newNames[i] = event.characters
                setColumns({ names: newNames, ...rest })
              }}
            />
          )
        })}
      </AutoLayout>
    </AutoLayout>
  )
}

widget.register(WpPostTable)
