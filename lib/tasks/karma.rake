desc "Run unit tests of JavaScript code with Karma"
task :karma do
  root_dir = File.expand_path(File.join(File.dirname(__FILE__),"..",".."))
  chdir File.join(root_dir) do
    sh("node_modules/.bin/karma start spec/javascript/karma.conf.js  " + 
       "--single-run --log-level=error --fail-on-empty-test-suite")
  end
end

task :default => :karma
