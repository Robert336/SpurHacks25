# QuestFlat Component Library

A comprehensive collection of reusable React components built with Tailwind CSS, designed specifically for the QuestFlat application.

## Component Organization

```
src/components/
├── ui/                 # Basic UI components
├── layout/             # Layout and structural components  
├── common/             # Application-specific components
└── index.js           # Centralized exports
```

## Usage

Import components from the main index file for clean imports:

```javascript
import { Button, Card, Header, FeatureCard } from '../components';
```

## UI Components

### Button
Flexible button component with multiple variants and sizes.

```javascript
<Button variant="primary" size="lg" href="/signup">
  Get Started
</Button>

<Button variant="secondary" onClick={handleClick}>
  Sign In
</Button>
```

**Props:**
- `variant`: "primary" | "secondary" | "ghost" | "outline"
- `size`: "sm" | "md" | "lg" | "xl"
- `href`: If provided, renders as Link component
- `onClick`: Click handler function
- `disabled`: Boolean

### Card
Versatile card component for content containers.

```javascript
<Card variant="feature" padding="lg">
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>
```

**Props:**
- `variant`: "default" | "glass" | "solid" | "feature" | "faq"
- `padding`: "none" | "sm" | "default" | "lg" | "xl"

### Badge
Small labels and tags for categorization.

```javascript
<Badge variant="purple" size="md">
  New Feature
</Badge>
```

**Props:**
- `variant`: "default" | "purple" | "pink" | "green" | "solid"
- `size`: "sm" | "md" | "lg"

### Avatar
User profile images and placeholders.

```javascript
<Avatar 
  src={user.avatar}
  fallback={user.name.charAt(0)}
  size="lg"
  gradient="purple"
/>
```

**Props:**
- `src`: Image source URL
- `fallback`: Fallback text/emoji
- `size`: "sm" | "md" | "lg" | "xl"
- `gradient`: "default" | "purple" | "green" | "warm"

### Input
Form input fields with validation styling.

```javascript
<Input 
  label="Email"
  type="email"
  placeholder="Enter your email"
  error={errors.email}
/>
```

**Props:**
- `type`: HTML input type
- `label`: Field label
- `error`: Error message
- `variant`: "default" | "filled" | "ghost"
- `size`: "sm" | "md" | "lg"

### Table
Data tables with consistent styling.

```javascript
<Table 
  headers={['Name', 'Status', 'Reward']}
  data={tasks}
  variant="striped"
/>
```

**Props:**
- `headers`: Array of column headers
- `data`: Array of row data
- `variant`: "default" | "minimal" | "striped"

## Layout Components

### Header
Application header with navigation and user info.

```javascript
<Header 
  user={currentUser}
  navigation={[
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/tasks', label: 'Tasks' }
  ]}
/>
```

### Footer
Application footer.

```javascript
<Footer>
  Custom footer content
</Footer>
```

### Container
Responsive container with consistent max-width and padding.

```javascript
<Container size="sm">
  <h1>Centered content</h1>
</Container>
```

**Props:**
- `size`: "sm" | "default" | "lg" | "full"

### Section
Full-width sections with background and padding options.

```javascript
<Section background="gradient" padding="lg">
  <h2>Section Title</h2>
  <p>Section content...</p>
</Section>
```

**Props:**
- `background`: "default" | "gradient" | "warm" | "dark" | "transparent"
- `padding`: "none" | "sm" | "default" | "lg" | "xl"
- `containerSize`: Container size to use

### PageLayout
Complete page layout combining header, content, and footer.

```javascript
<PageLayout user={user} navigation={navItems}>
  <YourPageContent />
</PageLayout>
```

## Common Components

### FeatureCard
Specialized cards for feature showcases.

```javascript
<FeatureCard 
  icon="📋"
  title="Create Tasks"
  description="Post household tasks with clear descriptions..."
  gradient="default"
/>
```

### FAQItem
Expandable FAQ items with accordion behavior.

```javascript
<FAQItem 
  question="How does the reward system work?"
  answer="Each household creates a shared fund..."
  defaultOpen={false}
/>
```

## Design System

### Colors
- Primary Green: `#3C6E57`, `#2E5744`
- Secondary Purple: `#9A7FF5` 
- Accent Colors: `#FFD972`, `#74A27E`, `#D4A6A6`
- Background: `#FFF4E6`, `#E9D8C5`

### Gradients
- Primary: `from-[#9A7FF5] to-[#74A27E]`
- Warm: `from-[#FFD972] to-[#D4A6A6]`
- Background: `from-[#FFF4E6] to-[#E9D8C5]`

### Typography
- Font weights: `font-medium`, `font-bold`
- Colors: `text-[#3C6E57]`, `text-[#2E5744]`

## Best Practices

1. **Consistent Imports**: Always import from the main index file
2. **Props Spreading**: Use `...props` to allow custom HTML attributes
3. **className Merging**: Append custom classes to component defaults
4. **Accessibility**: Include proper ARIA attributes and semantic HTML
5. **TypeScript**: Consider adding TypeScript definitions for better DX

## Examples

See the refactored homepage (`src/app/page.js`) for comprehensive usage examples. 