import Alpine from 'alpinejs';
import { chatForm } from './chat-form';
import './style.css'



document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  
    <h1 class="mb-4">Croppie Bot Client</h1>
    
    <div x-data="chatForm()">
      <form @submit.prevent="sendData" class="flex flex-col space-y-4">
        <textarea x-bind:disabled="isLoading" rows="12" type="text" x-model="inputData"  placeholder="Enter your message"
                class="w-full overflow-hidden px-4 py-2 border-neutral-500 
                bg-neutral-200 text-neutral-900
                dark:bg-neutral-700 dark:text-white
                
                focus:border-blue-500 
                rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 
                focus:border-transparent disabled:opacity-50">
        </textarea>
         
        <button type="submit" x-bind:disabled="isLoading"
        class="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300">
          <span>Send</span>
          <span x-show="isLoading" class="ml-2">
              <!-- Spinner Icon (Tailwind CSS Spinner) -->
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 01.33-1.77A8 8 0 0112 4v8h-8z"></path>
              </svg>
          </span>
        </button>
      </form>
     
      <p  class="mt-4 text-left text-neutral-500 dark:text-neutral-400">
        Result:
      </p>

      <pre class="p-4 
        bg-neutral-200 text-neutral-900
        dark:bg-neutral-700 dark:text-white
        mt-2 rounded overflow-auto text-left">
    
        <code class="whitespace-pre-wrap " x-text="message">
        
        </code>
      </pre>

    </div>
  </div>
`
// Register the component with Alpine
Alpine.data('chatForm', chatForm);

// Start Alpine
window.Alpine = Alpine;
Alpine.start();
