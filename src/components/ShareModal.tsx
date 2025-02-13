'use client'

import { useState } from 'react'
import { Share2, Link2, Check, Download } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '&/components/ui/dialog'
import { Button } from '&/components/ui/button'
import { Input } from '&/components/ui/input'
import { toast } from '&/hooks/use-toast'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '&/components/ui/card'
import { Fortune } from '&/types'

interface ShareModalProps {
  fortune: Fortune | null
  fortuneImage: string | null
}

export function ShareModal({ fortune, fortuneImage }: ShareModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  if (!fortune) {
    return null
  }

  const shareUrl = `${location.origin}?fortune=${encodeURIComponent(
    JSON.stringify(fortune)
  )}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setIsCopied(true)
    toast({
      title: 'Link copied!',
      description: 'The share link has been copied to your clipboard.',
    })
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const shareData: ShareData = {
          title: 'My Tech Fortune',
          text: fortune.prediction,
          url: shareUrl,
        }

        if (fortuneImage) {
          const response = await fetch(fortuneImage)
          const blob = await response.blob()
          const file = new File([blob], 'fortune.png', { type: 'image/png' })
          shareData.files = [file]
        }

        await navigator.share(shareData)
        toast({
          title: 'Fortune shared!',
          description: 'Your fortune has been shared successfully.',
        })
      } catch (error) {
        console.error('Error sharing:', error)
        toast({
          title: 'Sharing failed',
          description: 'There was an error while sharing your fortune.',
          variant: 'destructive',
        })
      }
    } else {
      handleCopyLink()
    }
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='flex items-center space-x-2 text-white bg-blue-500 hover:bg-blue-600'
        >
          <Share2 className='w-4 h-4' />
          <span>Share Fortune</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='mb-4 text-2xl font-bold text-center'>
            Share your tech fortune
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-col space-y-6'>
          <Card className='text-white bg-gradient-to-br from-blue-500 to-purple-600'>
            <CardHeader>
              <CardTitle className='flex items-center text-xl font-bold'>
                <Share2 className='mr-2' />
                {fortune.header}
              </CardTitle>
              <CardDescription className='text-blue-100'>
                AI Personality: {fortune.personality}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='mb-4 text-sm'>{fortune.prediction}</p>
              <div className='flex justify-between text-xs opacity-90'>
                <span>Lucky Tech Item: {fortune.luckyTechItem}</span>
                <span>Tech Aura: {fortune.techAuraColor}</span>
                <span>Rarity: {fortune.rarityScore}</span>
              </div>
            </CardContent>
          </Card>
          <p className='text-center text-gray-500'>
            Spread the mystical wisdom of your digital fortune!
          </p>
          <div className='flex items-center space-x-2'>
            <Input readOnly value={shareUrl} className='flex-grow text-sm' />
            <Button
              variant='outline'
              onClick={handleCopyLink}
              className='flex-shrink-0'
            >
              {isCopied ? (
                <Check className='w-4 h-4' />
              ) : (
                <Link2 className='w-4 h-4' />
              )}
            </Button>
          </div>
          <Button onClick={handleShare} className='w-full'>
            {'share' in navigator ? 'Share Fortune' : 'Copy Link'}
          </Button>
          {fortuneImage && (
            <Button
              onClick={() => window.open(fortuneImage, '_blank')}
              className='mt-2 w-full'
            >
              <Download className='mr-2 w-4 h-4' /> Download Fortune Image
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
