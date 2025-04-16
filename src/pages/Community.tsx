
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PencilLine, MessageSquare, Heart, Share, Send, UserPlus, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    level: number;
    following?: boolean;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timeAgo: string;
  liked: boolean;
}

const CommunityPage = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      user: {
        name: 'Jane Cooper',
        avatar: '',
        level: 8,
        following: false
      },
      content: "Just completed my 30-day meditation challenge! I feel so much calmer and focused now. Who else has tried this challenge?",
      likes: 24,
      comments: 6,
      timeAgo: '2h ago',
      liked: false
    },
    {
      id: '2',
      user: {
        name: 'Alex Morgan',
        avatar: '',
        level: 12,
        following: true
      },
      content: "Hit a new milestone today - ran 10km in under an hour! Been working towards this goal for months and finally achieved it. If I can do it, you can too!",
      likes: 45,
      comments: 12,
      timeAgo: '5h ago',
      liked: true
    },
    {
      id: '3',
      user: {
        name: 'Michael Scott',
        avatar: '',
        level: 5,
        following: false
      },
      content: "Looking for accountability partners for a new reading challenge - 20 books in 3 months! Anyone interested in joining?",
      likes: 18,
      comments: 8,
      timeAgo: '1d ago',
      liked: false
    }
  ]);

  const [newPost, setNewPost] = useState({
    content: ''
  });

  const [comments, setComments] = useState<{[key: string]: string}>({});
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Post['user'] | null>(null);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

  const handleCreatePost = () => {
    if (!newPost.content.trim()) {
      toast.error('Please write something for your post');
      return;
    }

    const post: Post = {
      id: Date.now().toString(),
      user: {
        name: 'You',
        avatar: '',
        level: 5,
        following: false
      },
      content: newPost.content,
      likes: 0,
      comments: 0,
      timeAgo: 'Just now',
      liked: false
    };

    setPosts([post, ...posts]);
    setNewPost({ content: '' });
    setIsOpen(false);
    toast.success('Post published!');
  };

  const handleToggleLike = (id: string) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  const handleAddComment = (id: string) => {
    if (!comments[id]?.trim()) {
      toast.error('Please write a comment');
      return;
    }

    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          comments: post.comments + 1
        };
      }
      return post;
    }));

    // Clear the comment input
    setComments({...comments, [id]: ''});
    toast.success('Comment added!');
  };

  const handleOpenUserProfile = (user: Post['user']) => {
    setSelectedUser(user);
    setIsUserProfileOpen(true);
  };

  const handleToggleFollow = () => {
    if (!selectedUser) return;
    
    // Update the selected user following state
    setSelectedUser({
      ...selectedUser,
      following: !selectedUser.following
    });
    
    // Update the user in posts
    setPosts(posts.map(post => {
      if (post.user.name === selectedUser.name) {
        return {
          ...post,
          user: {
            ...post.user,
            following: !selectedUser.following
          }
        };
      }
      return post;
    }));
    
    toast.success(selectedUser.following ? 'Unfollowed user' : 'Following user');
  };

  const handleSendMessage = () => {
    if (!selectedUser) return;
    toast.success(`Message dialog opened for ${selectedUser.name}`);
    // Here you would typically open a chat interface or messaging page
  };

  return (
    <MainLayout>
      <div className="page-container space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Community</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1 bg-accent">
                <PencilLine size={16} />
                <span>Create Post</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-2">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarFallback>YO</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">You</p>
                    <p className="text-xs text-muted-foreground">Level 5</p>
                  </div>
                </div>
                
                <Textarea 
                  placeholder="What's on your mind?" 
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  className="min-h-[120px]"
                />
                
                <Button onClick={handleCreatePost} className="w-full">Publish Post</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="feed">
          <TabsList className="mb-4">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
          </TabsList>
          
          <TabsContent value="feed" className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="bg-card rounded-xl p-4 shadow-sm border">
                <div className="flex justify-between items-start mb-3">
                  <div 
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => handleOpenUserProfile(post.user)}
                  >
                    <Avatar>
                      <AvatarFallback>{post.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium hover:underline">{post.user.name}</p>
                        <span className="text-xs bg-theme-purple/10 text-theme-purple px-2 py-0.5 rounded-full">
                          Lv. {post.user.level}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
                    </div>
                  </div>
                </div>
                
                <p className="mb-4">{post.content}</p>
                
                <div className="flex items-center justify-between border-t pt-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleToggleLike(post.id)}
                    className={post.liked ? "text-red-500" : ""}
                  >
                    <Heart size={18} className={post.liked ? "fill-current" : ""} />
                    <span className="ml-1">{post.likes}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm">
                    <MessageSquare size={18} />
                    <span className="ml-1">{post.comments}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm">
                    <Share size={18} />
                    <span className="ml-1">Share</span>
                  </Button>
                </div>
                
                <div className="mt-3 border-t pt-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback>YO</AvatarFallback>
                    </Avatar>
                    <Input 
                      placeholder="Write a comment..." 
                      className="flex-1" 
                      value={comments[post.id] || ''}
                      onChange={(e) => setComments({...comments, [post.id]: e.target.value})}
                    />
                    <Button size="sm" onClick={() => handleAddComment(post.id)}>
                      <Send size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="groups">
            <div className="flex flex-col items-center justify-center py-12">
              <h3 className="text-xl font-medium mb-2">Groups Coming Soon</h3>
              <p className="text-muted-foreground text-center max-w-md">
                You'll soon be able to create and join groups based on your interests, goals, and challenges.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="discover">
            <div className="flex flex-col items-center justify-center py-12">
              <h3 className="text-xl font-medium mb-2">Discover Coming Soon</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Discover new friends, challenges, and communities based on your interests and goals.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* User Profile Dialog */}
      <Dialog open={isUserProfileOpen} onOpenChange={setIsUserProfileOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="text-xl">
                  {selectedUser.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center">
                <h3 className="font-semibold text-lg">{selectedUser.name}</h3>
                <p className="text-muted-foreground text-sm">
                  Level {selectedUser.level} • Community Member
                </p>
              </div>
              
              <div className="flex space-x-2 w-full">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        onClick={handleToggleFollow}
                        variant={selectedUser.following ? "outline" : "default"}
                        className="flex-1"
                      >
                        <UserPlus size={16} />
                        <span>{selectedUser.following ? 'Unfollow' : 'Follow'}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{selectedUser.following ? 'Unfollow' : 'Follow'} {selectedUser.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        onClick={handleSendMessage}
                        variant="secondary"
                        className="flex-1"
                      >
                        <MessageCircle size={16} />
                        <span>Message</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Send a message to {selectedUser.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <Card className="w-full">
                <CardContent className="pt-6">
                  <div className="flex justify-between text-center">
                    <div>
                      <p className="text-xl font-bold">12</p>
                      <p className="text-muted-foreground text-xs">Posts</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold">243</p>
                      <p className="text-muted-foreground text-xs">Followers</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold">135</p>
                      <p className="text-muted-foreground text-xs">Following</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default CommunityPage;
