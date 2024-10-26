import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert } from '@mantine/core'

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
    <Alert variant="light" color="red" title={`${name}: ${message}`} icon={<FontAwesomeIcon icon={faExclamationCircle} />}>
      <pre>{stack}</pre>
    </Alert>
  )
}
