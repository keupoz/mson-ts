export interface ErrorDisplayProps {
  error: unknown
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  let name, message, stack

  if (error instanceof Error) {
    name = error.name
    message = error.message
    stack = error.stack
  } else {
    name = 'Error'
    message = String(error)
  }

  return (
    <div className="flex flex-col gap-2 p-3">
      <h3 className="text-xl font-bold text-red-500">An error occurred:</h3>
      <pre>{`${name}: ${message}`}</pre>
      <pre className="text-muted-foreground">{stack}</pre>
    </div>
  )
}
