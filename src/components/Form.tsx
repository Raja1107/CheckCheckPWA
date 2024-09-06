import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useState, useEffect } from 'react'
import { FormProps } from '../types'

const Form = ({ addToDo }: FormProps) => {
    const [title, setTitle] = useState('')
    const [notificationSupported, setNotificationSupported] = useState(false)

    useEffect(() => {
        const checkNotificationSupport = async () => {
            console.log('Checking notification support...')
            if (
                'Notification' in window &&
                'serviceWorker' in navigator &&
                'PushManager' in window
            ) {
                const permission = await Notification.requestPermission()
                console.log('Notification permission:', permission)
                setNotificationSupported(permission === 'granted')
            } else {
                console.log('Notifications not supported')
            }
        }
        checkNotificationSupport()
    }, [])

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if (title.trim() !== '') {
            addToDo(title)
            if (notificationSupported) {
                await sendPushNotification(title)
            }
        }
        setTitle('')
    }

    const sendPushNotification = async (taskTitle: string) => {
        console.log('Trying to send push notification...')
        try {
            const registration = await navigator.serviceWorker.ready
            console.log('Service Worker ready')
            await registration.showNotification('New Task Added', {
                body: `You've added a new task: ${taskTitle}`,
                icon: './favicon-32x32.png',
                tag: 'new-task',
            })
            console.log('Notification sent successfully')
        } catch (error) {
            console.error('Error sending push notification:', error)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex justify-between bg-sky-400 p-4 rounded-lg items-center mb-4"
        >
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xl rounded-lg p-[3px] text-gray-800"
                placeholder="Add a new task"
            />
            <button type="submit" className="ml-2 rounded-lg text-gray-800">
                <AddCircleIcon />
            </button>
        </form>
    )
}

export default Form
