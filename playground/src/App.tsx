import { useState } from 'react';
import {
  Accordion,
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  Collapsible,
  mantiUi,
  RadioGroup,
  Spinner,
  Switch,
  Tabs,
  TextField,
  Toggle,
  Tooltip,
} from '@manti-ui/react';

const InfoIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
    <circle
      cx="12"
      cy="12"
      r="9"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M12 11v5M12 7.5v.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className="manti-app" data-theme={theme}>
      <main className="page">
        <header className="page__header">
          <div>
            <p className="page__eyebrow">Integration playground</p>
            <h1 className="page__title">{mantiUi.name}</h1>
            <p className="page__lede">
              A framework-agnostic design system with smooth colors, smooth
              transitions, and smooth components.
            </p>
          </div>
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          >
            Dark theme
          </Switch>
        </header>

        <div className="grid">
          <Card>
            <Card.Header>
              <Card.Title>Buttons</Card.Title>
              <Card.Description>
                Four variants across every tone.
              </Card.Description>
            </Card.Header>
            <Card.Body>
              <div className="cluster">
                <Button>Solid</Button>
                <Button variant="soft">Soft</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button tone="success">Success</Button>
                <Button tone="danger" variant="soft">
                  Danger
                </Button>
                <Button loading>Loading</Button>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Selection</Card.Title>
              <Card.Description>
                Switches, checkboxes, and toggles.
              </Card.Description>
            </Card.Header>
            <Card.Body>
              <div className="stack">
                <Switch defaultChecked>Garlic yogurt</Switch>
                <Checkbox defaultChecked>Extra sumac</Checkbox>
                <Checkbox indeterminate>Mixed fillings</Checkbox>
                <div className="cluster">
                  <Toggle defaultPressed>Spicy</Toggle>
                  <Toggle tone="success">Vegetarian</Toggle>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Form</Card.Title>
              <Card.Description>
                Labels, hints, and validation.
              </Card.Description>
            </Card.Header>
            <Card.Body>
              <div className="stack">
                <TextField
                  label="Recipe name"
                  placeholder="Kayseri mantısı"
                  hint="Visible in the shared cookbook."
                  fullWidth
                />
                <TextField
                  label="Servings"
                  defaultValue="0"
                  error="Add at least one serving."
                  fullWidth
                />
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Feedback</Card.Title>
              <Card.Description>Badges, alerts, and spinners.</Card.Description>
            </Card.Header>
            <Card.Body>
              <div className="stack">
                <div className="cluster">
                  <Badge tone="success" dot>
                    Fresh
                  </Badge>
                  <Badge tone="warning" variant="solid">
                    Resting
                  </Badge>
                  <Badge tone="info" variant="outline">
                    Steamed
                  </Badge>
                </div>
                <Alert tone="info" title="Dough is resting" icon={InfoIcon}>
                  Give it 30 minutes before you start rolling.
                </Alert>
                <div className="cluster">
                  <Spinner />
                  <span style={{ color: 'var(--manti-text-muted)' }}>
                    Simmering…
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Navigation</Card.Title>
              <Card.Description>Tabs and disclosures.</Card.Description>
            </Card.Header>
            <Card.Body>
              <div className="stack">
                <Tabs
                  items={[
                    {
                      value: 'dough',
                      label: 'Dough',
                      content: 'Flour, egg, water, salt.',
                    },
                    {
                      value: 'filling',
                      label: 'Filling',
                      content: 'Beef or lamb, onion, spice.',
                    },
                    {
                      value: 'sauce',
                      label: 'Sauce',
                      content: 'Garlic yogurt, paprika butter.',
                    },
                  ]}
                />
                <Accordion
                  items={[
                    {
                      value: 'shape',
                      title: 'How small should they be?',
                      content:
                        'Traditionally tiny — many fit on a single spoon.',
                    },
                    {
                      value: 'serve',
                      title: 'What goes on top?',
                      content:
                        'Garlic yogurt, melted chili butter, dried mint, sumac.',
                    },
                  ]}
                />
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Choice</Card.Title>
              <Card.Description>Radio group and tooltip.</Card.Description>
            </Card.Header>
            <Card.Body>
              <div className="stack">
                <RadioGroup
                  label="Cooking method"
                  defaultValue="boiled"
                  items={[
                    { value: 'boiled', label: 'Boiled' },
                    { value: 'steamed', label: 'Steamed' },
                    { value: 'fried', label: 'Fried' },
                  ]}
                />
                <Collapsible trigger="Show chef's note">
                  <p
                    style={{
                      padding: '12px 4px 0',
                      color: 'var(--manti-text-muted)',
                    }}
                  >
                    Rest the dough for 30 minutes for a smoother roll.
                  </p>
                </Collapsible>
                <Tooltip content="Backed by a Zag.js machine">
                  <Button variant="soft" tone="neutral">
                    Hover or focus me
                  </Button>
                </Tooltip>
              </div>
            </Card.Body>
          </Card>
        </div>

        <footer className="page__footer">
          <code>{mantiUi.packageName}</code> · powered by{' '}
          {mantiUi.behaviorFoundation}
        </footer>
      </main>
    </div>
  );
}
