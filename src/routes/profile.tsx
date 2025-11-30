import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery } from 'convex/react'
import { Authenticated, Unauthenticated } from 'convex/react'
import { SignInButton } from '@clerk/clerk-react'
import { api } from '../../convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Authenticated>
        <ProfileForm />
      </Authenticated>
      <Unauthenticated>
        <Card>
          <CardHeader>
            <CardTitle>Sign in to create your profile</CardTitle>
            <CardDescription>
              You need to be signed in to create or edit your profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
          </CardContent>
        </Card>
      </Unauthenticated>
    </div>
  )
}

function ProfileForm() {
  const getOrCreateUser = useMutation(api.users.getOrCreateUser)
  const myProfile = useQuery(api.profiles.myProfile)
  const upsertProfile = useMutation(api.profiles.upsertProfile)

  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [saving, setSaving] = useState(false)

  // Ensure user exists on mount
  useEffect(() => {
    getOrCreateUser()
  }, [getOrCreateUser])

  // Populate form when profile loads
  useEffect(() => {
    if (myProfile) {
      setDisplayName(myProfile.displayName)
      setBio(myProfile.bio || '')
    }
  }, [myProfile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await upsertProfile({
        displayName,
        bio: bio || undefined,
      })
    } finally {
      setSaving(false)
    }
  }

  if (myProfile === undefined) {
    return <p className="text-muted-foreground">Loading...</p>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{myProfile ? 'Edit Your Profile' : 'Create Your Profile'}</CardTitle>
        <CardDescription>
          {myProfile
            ? 'Update your profile information below.'
            : 'Fill in the details below to create your profile.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="displayName" className="text-sm font-medium">
              Display Name
            </label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your display name"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm font-medium">
              Bio
            </label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              rows={4}
            />
          </div>
          <Button type="submit" disabled={saving || !displayName.trim()}>
            {saving ? 'Saving...' : myProfile ? 'Update Profile' : 'Create Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
